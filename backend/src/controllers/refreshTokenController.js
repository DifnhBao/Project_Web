import jwt from "jsonwebtoken";
import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

// Tạo access token mới từ refresh token
export const refreshAccessToken = (roleType = "user") => {
  return async (req, res) => {
    try {
      // CHỌN COOKIE PHÙ HỢP
      const refreshCookieName =
        roleType === "admin" ? "refreshTokenWithAdmin" : "refreshToken";

      const accessCookieName =
        roleType === "admin" ? "accessTokenWithAdmin" : "accessToken";

      const token = req.cookies?.[refreshCookieName];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Refresh token không tồn tại." });
      }

      // KIỂM TRA TRONG BẢNG SESSION
      const sql = "SELECT * FROM user_sessions WHERE refresh_token = ?";
      const [rows] = await db.query(sql, [token]);
      if (!rows.length) {
        return res.status(403).json({ message: "Refresh Token không hợp lệ." });
      }

      const session = rows[0];

      // CHECK HẾT HẠN
      if (new Date(session.expires_at) < new Date()) {
        await db.query("DELETE FROM user_sessions WHERE id = ?", [session.id]);
        return res.status(403).json({ message: "Refresh token đã hết hạn." });
      }

      // LẤY USER / ADMIN
      const [userRows] = await db.query(
        "SELECT id, email, role FROM users WHERE id = ?",
        [session.user_id]
      );

      if (!userRows.length) {
        return res.status(404).json({ message: "Không tìm thấy người dùng." });
      }

      const user = userRows[0];

      // TẠO ACCESS TOKEN
      const newAccessToken = jwt.sign(
        {
          Id: user.id,
          Email: user.email,
          Role: user.role,
          Type: roleType,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );

      // GỬI COOKIE
      res.cookie(accessCookieName, newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 60 * 1000,
      });

      return res.status(200).json({ message: "Refresh token thành công." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Lỗi hệ thống." });
    }
  };
};
