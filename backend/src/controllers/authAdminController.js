import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_TTL = 30 * 60 * 1000;
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

// Kiểm tra trạng thái đăng nhập của admin
export const me = async (req, res) => {
  try {
    // Lấy token từ cookie trước, nếu không có thì lấy từ header Authorization
    const token =
      req.cookies?.accessTokenWithAdmin ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) {
      return res.status(401).json({ message: "Chưa đăng nhập." });
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedAdmin) => {
        if (err) {
          console.error(err);
          return res
            .status(403)
            .json({ message: "Access token hết hạn hoặc không đúng." });
        }

        // tìm user
        const sql =
          "SELECT id, username, email, role, account_status, activity_status, created_at FROM users WHERE id = ?";
        const [rows] = await db.query(sql, [decodedAdmin.Id]);
        if (!rows || rows.length === 0)
          return res.status(404).json({ message: "Không tìm thấy user." });

        return res.status(200).json({ admin: rows[0] });
      }
    );
  } catch (error) {
    console.error("Lỗi khi gọi /auth-admin/me:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// Cho phép tư cách admin
export const approveAdmin = async (req, res) => {
  try {
    // Lấy Id tài khoản đang chờ xác nhận từ req.body
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !["accept", "reject"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin hoặc status không hợp lệ." });
    }

    // Nếu admin bấm rejected
    if (status === "reject") {
      const deleteSql = "DELETE FROM users WHERE id = ? AND role = 'admin' ";
      const [rows] = await db.query(deleteSql, [id]);

      if (!rows || rows.length === 0) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy tài khoản admin để xóa." });
      }

      return res.status(200).json({ message: "Đã từ chối cấp quyền admin." });
    }

    // Nếu Active
    const sql =
      "UPDATE users SET account_status = ? WHERE id = ? AND role = 'admin'";
    const [rows] = await db.query(sql, ["actived", id]);

    if (!rows || rows.length === 0)
      return res
        .status(404)
        .json({ message: "Không tìm thấy tài khoản admin." });

    return res.status(200).json({
      message: "Phê duyệt tài khoản thành công.",
    });
  } catch (error) {
    console.error("Lỗi khi duyệt admin:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// Đăng ký tài khoản
export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "Thiếu thông tin đăng ký." });

    // Mã hóa mật khẩu
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Thêm admin vào bảng users, status = 'pending'
    const sql = `
        INSERT INTO users (username, email, hashed_password, role, account_status)
        VALUES (?, ?, ?, 'admin', 'pending')
      `;
    await db.query(sql, [username, email, hashedPassword]);

    return res.status(201).json({
      message:
        "Đăng ký thành công. Tài khoản của bạn đang chờ phê duyệt bởi quản trị viên.",
    });
  } catch (error) {
    console.error("Lỗi khi gọi register ", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// Đăng nhập
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Thiếu email hoặc password." });

    // Lấy hashedPassword trong db để so sánh với password input
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(sql, [email]);
    if (rows.length === 0)
      return res.status(401).json({ message: "Không tìm thấy quản trị viên." });

    const admin = rows[0];

    if (!(admin.role === "admin" || admin.role === "super_admin")) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền đăng nhập trang admin." });
    }

    // Kiểm tra trạng thái tài khoản admin
    if (admin.account_status === "pending") {
      return res
        .status(403)
        .json({ message: "Tài khoản đang chờ được kích hoạt quyền quản trị." });
    }

    // Kiểm tra password
    const isPasswordValid = await bcrypt.compareSync(
      password,
      admin.hashed_password
    );
    if (!isPasswordValid)
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không chính xác." });

    // Đổi trạng thái hoạt động
    const update_ActivityStatusSql =
      "UPDATE users SET activity_status = 'online' WHERE id = ?";
    await db.query(update_ActivityStatusSql, [admin.id]);

    // Xóa token hết hạn trước khi tạo mới
    await db.query("DELETE FROM user_sessions WHERE expires_at < NOW()");

    // Nếu khớp tạo accessToken với JWT
    const accessTokenWithAdmin = jwt.sign(
      {
        Id: admin.id,
        Email: admin.email,
        Role: admin.role,
        Type: "admin",
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    // Tạo refresh token
    const refreshTokenWithAdmin = crypto.randomBytes(64).toString("hex");
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL);

    // Xóa token cũ trước khi thêm mới
    await db.query("DELETE FROM user_sessions WHERE user_id = ?", [admin.id]);

    // Tạo session mới để lưu refresh token
    await db.query(
      "INSERT INTO user_sessions (user_id, refresh_token, expires_at) VALUES (?, ?, ?)",
      [admin.id, refreshTokenWithAdmin, expiresAt]
    );

    // Set accessToken cookie ngắn hạn
    res.cookie("accessTokenWithAdmin", accessTokenWithAdmin, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ACCESS_TOKEN_TTL,
    });

    // Trả refresh token về trong cookie
    res.cookie("refreshTokenWithAdmin", refreshTokenWithAdmin, {
      httpOnly: true,
      secure: true, // backend, frontend deploy riêng
      sameSite: "none",
      maxAge: REFRESH_TOKEN_TTL,
    });

    // Trả về thông tin người dùng + access token
    const adminInfo = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    };

    // Trả access token về trong res
    return res.status(200).json({
      message: `Admin ${admin.username} đã đăng nhập!`,
      accessTokenWithAdmin, // không tối ưu, Nên đổi qua trả accesstoken về cookie
      adminInfo,
    });
  } catch (error) {
    console.error("Lỗi khi gọi Login admin", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// Đăng xuất
export const logoutAmin = async (req, res) => {
  try {
    // Lấy refresh token từ cookie
    const token = req.cookies?.refreshTokenWithAdmin;

    if (token) {
      // Lay id admin
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
      res.clearCookie("refreshTokenWithAdmin");
      res.clearCookie("accessTokenWithAdmin");
    }

    // Yêu cầu đã xử lý thành công nhưng không cần trả về gì hết
    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi signOut!", error);
    return res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};

// Tạo access token mới từ refresh token
export const refreshAccessTokenWithAdmin = async (req, res) => {
  try {
    // Lấy refresh token từ cookie
    const token = req.cookies?.refreshTokenWithAdmin;
    if (!token) {
      return res.status(401).json({ message: "Token không tồn tại." });
    }

    // Kiểm tra so với refresh token trong DB
    const sql = "SELECT * FROM user_sessions WHERE refresh_token = ?";
    const [rows] = await db.query(sql, [token]);
    if (rows.length === 0) {
      return res
        .status(403)
        .json({ message: "Token không hợp lệ hoặc đã hết hạn." });
    }

    const session = rows[0];

    const [adminRows] = await db.query(
      "SELECT id, email, role FROM users WHERE id = ?",
      [session.user_id]
    );
    if (adminRows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy admin." });
    }

    const admin = adminRows[0];

    //Kiểm tra hết hạn chưa
    if (new Date(session.expires_at) < new Date()) {
      await db.query("DELETE FROM user_sessions WHERE id = ?", [session.id]);
      return res.status(403).json({ message: "Token đã hết hạn." });
    }

    // Tạo access token mới
    const accessTokenWithAdmin = jwt.sign(
      {
        Id: admin.id,
        Email: admin.email,
        Role: admin.role,
        Type: "admin",
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    // Set cookie mới cho access token
    res.cookie("accessTokenWithAdmin", accessTokenWithAdmin, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ACCESS_TOKEN_TTL,
    });

    // Return
    return res.status(200).json({ accessTokenWithAdmin });
  } catch (error) {
    console.error("Lỗi khi refreshToken:", error);
    return res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};

export const addNewAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "Thiếu thông tin yêu cầu." });

    // Mã hóa mật khẩu
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Thêm admin vào bảng admins, status = 'actived'
    const sql = `
        INSERT INTO users (username, email, hashed_password, role, account_status)
        VALUES (?, ?, ?, 'admin', 'actived')
      `;
    await db.query(sql, [username, email, hashedPassword]);

    return res.status(201).json({
      message: "Thêm tài khoản quản trị viên thành công.",
    });
  } catch (error) {
    console.error("Lỗi khi gọi addNewAdmin", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
