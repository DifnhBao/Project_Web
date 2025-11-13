import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../config/db.js";

dotenv.config();

// authorization - xác minh user là ai
export const verifyToken = (roleType = "user") => {
  return async (req, res, next) => {
    try {
      // Lấy token từ header cookie
      let token;
      roleType === "user"
        ? (token = req.cookies?.accessToken) //|| (req.headers.authorization && req.headers.authorization.split(" ")[1])
        : (token = req.cookies?.accessTokenWithAdmin);

      // Xác nhận token hợp lệ
      if (!token)
        return res
          .status(401)
          .json({ message: "Không tìm thấy access token." });

      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            console.error(err);
            return res
              .status(403)
              .json({ message: "Access token hết hạn hoặc không đúng." });
          }

          // tìm user / admin
          const sql = `SELECT id, username, email, role FROM users WHERE id = ?`;
          const [rows] = await db.query(sql, [decoded.Id]);
          if (!rows || rows.length === 0) {
            return res.status(404).json({
              message: `Không tìm thấy người dùng có token hiện tại.`,
            });
          }

          // Trả thông tin vào request để controller dùng
          req.user = rows[0];
          req.user.roleType = roleType;

          next();

          // Ket qua sau khi di tiep
          /*
          req.user = {
            id: ..., 
            username: ...,
            email: ...,
            role: "admin" | "super_admin" | "user", // lấy từ DB
            roleType: "admin" | "user", // xác định nguồn token
          } */
        }
      );
    } catch (error) {
      console.error("Lỗi khi xác minh JWT:", error);
      return res.status(500).json({ message: "Lỗi hệ thống." });
    }
  };
};

// export const checkRole = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({ message: "Chưa xác thực." });
//     }

//     if (allowedRoles.includes(req.user.role)) {
//       return next(); // Có quyền => đi tiếp
//     }

//     return res.status(403).json({
//       message: `Bạn không có quyền truy cập (cần ${allowedRoles.join(", ")})`,
//     });
//   };
// };
