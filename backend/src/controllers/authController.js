import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();
const ACCESS_TOKEN_TTL = 30 * 60 * 1000;
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

// Kiểm tra trạng thái đăng nhập
export const me = async (req, res) => {
  try {
    // Lấy token từ cookie trước, nếu không có thì lấy từ header Authorization
    const token =
      req.cookies?.accessToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) {
      return res.status(401).json({ message: "Chưa đăng nhập." });
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedUser) => {
        if (err) {
          console.error(err);
          return res
            .status(403)
            .json({ message: "Access token hết hạn hoặc không đúng." });
        }

        // tìm user
        const sql = "SELECT id, username, email, role FROM users WHERE id = ?";
        const [rows] = await db.query(sql, [decodedUser.Id]);
        if (!rows || rows.length === 0)
          return res.status(404).json({ message: "Không tìm thấy user." });

        const user = rows[0];

        // Lấy thêm profile (nếu có)
        const [profiles] = await db.query(
          "SELECT first_name, last_name, gender, date_of_birth, phone, address FROM user_profile WHERE user_id = ?",
          [user.id]
        );

        return res.status(200).json({
          user,
          profile: profiles.length > 0 ? profiles[0] : null,
        });
      }
    );
  } catch (error) {
    console.error("Lỗi khi gọi /auth/me:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// Đăng ký tài khoản
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "Thiếu thông tin đăng ký." });

    // Mã hóa mật khẩu
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Tạo user mới
    const sql =
      "INSERT INTO users (username, email, hashed_password) VALUES (?, ?, ?)";

    // Thông báo đăng kí thành công/ thất bại
    await db.query(sql, [username, email, hashedPassword]);
    return res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error("Lỗi khi gọi register ", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// Đăng nhập
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Thiếu email hoặc password." });

    // Lấy hashedPassword trong db để so sánh với password input
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(sql, [email]);
    if (rows.length === 0)
      return res.status(401).json({ message: "Không tìm thấy người dùng." });

    const user = rows[0];

    // Kiểm tra password
    const isPasswordValid = await bcrypt.compareSync(
      password,
      user.hashed_password
    );

    if (!isPasswordValid)
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không chính xác." });

    // Đổi trạng thái hoạt động
    const update_ActivityStatusSql =
      "UPDATE users SET activity_status = 'online' WHERE id = ?";
    await db.query(update_ActivityStatusSql, [user.id]);

    // Xóa token hết hạn trước khi tạo mới
    await db.query("DELETE FROM user_sessions WHERE expires_at < NOW()");

    // Nếu khớp tạo accessToken với JWT
    const accessToken = jwt.sign(
      { Id: user.id, Email: user.email, Role: user.role, Type: "user" },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    // Tạo refresh token
    const refreshToken = crypto.randomBytes(64).toString("hex");
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL);

    // Xóa token cũ trước khi thêm mới
    await db.query("DELETE FROM user_sessions WHERE user_id = ?", [user.id]);

    // Tạo session mới để lưu refresh token
    await db.query(
      "INSERT INTO user_sessions (user_id, refresh_token, expires_at) VALUES (?, ?, ?)",
      [user.id, refreshToken, expiresAt]
    );

    // Set accessToken cookie ngắn hạn
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ACCESS_TOKEN_TTL,
    });

    // Trả refresh token về trong cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // backend, frontend deploy riêng
      sameSite: "none",
      maxAge: REFRESH_TOKEN_TTL,
    });

    // Trả về thông tin người dùng + access token
    const userInfo = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    // Trả access token về trong res
    return res.status(200).json({
      message: `User ${user.email} đã đăng nhập!`,
      accessToken, // không tối ưu, Nên đổi qua trả accesstoken về cookie
      userInfo,
    });
  } catch (error) {
    console.error("Lỗi khi gọi SignIn ", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// Đăng xuất
export const logout = async (req, res) => {
  try {
    // Lấy refresh token từ cookie
    const token = req.cookies?.refreshToken;

    if (token) {
      // Lay id user
      const [rows] = await db.query(
        "SELECT user_id FROM user_sessions WHERE refresh_token = ?",
        [token]
      );

      if (rows.length > 0) {
        const userId = rows[0].user_id;
        // Đổi trạng thái hoạt động
        const update_ActivityStatusSql =
          "UPDATE users SET activity_status = 'offline' WHERE id = ?";
        await db.query(update_ActivityStatusSql, [userId]);
      }

      // Xóa refresh token trong session
      const sql = "DELETE FROM user_sessions WHERE refresh_token = ?";
      await db.query(sql, [token]);

      // Xóa cookie
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
    }

    // Yêu cầu đã xử lý thành công nhưng không cần trả về gì hết
    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi logout!", error);
    return res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};

// // Tạo access token mới từ refresh token
// export const refreshAccessToken = async (req, res) => {
//   try {
//     // Lấy refresh token từ cookie
//     const token = req.cookies?.refreshToken;
//     if (!token) {
//       return res.status(401).json({ message: "Token không tồn tại." });
//     }

//     // Kiểm tra so với refresh token trong DB
//     const sql = "SELECT * FROM refresh_tokens WHERE token = ?";
//     const [rows] = await db.query(sql, [token]);
//     if (rows.length === 0) {
//       return res
//         .status(403)
//         .json({ message: "Token không hợp lệ hoặc đã hết hạn." });
//     }

//     const session = rows[0];

//     //Kiểm tra hết hạn chưa
//     if (new Date(session.expires_at) < new Date()) {
//       return res.status(403).json({ message: "Token đã hết hạn." });
//     }

//     // Tạo access token mới
//     const accessToken = jwt.sign(
//       { userId: session.user_id },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: ACCESS_TOKEN_TTL }
//     );

//     // Return
//     return res.status(200).json({ accessToken });
//   } catch (error) {
//     console.error("Lỗi khi refreshToken:", error);
//     return res.status(500).json({ message: "Lỗi hệ thống!" });
//   }
// };
