import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, roleType, username } = req.user;

    // Không cho xóa chính mình
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({
        message: "Không thể tự xóa tài khoản của chính mình.",
      });
    }

    // Kiểm tra xem có quyền xóa hay không
    if (roleType !== "admin") {
      return res.status(403).json({ message: "Không có quyền xóa tài khoản." });
    }

    let deleteSql;

    // super_admin có thể "xóa" (thực chất là ban) bất kỳ tài khoản nào
    if (roleType === "admin" && role === "super_admin") {
      deleteSql = `
        UPDATE users 
        SET 
          account_status = 'banned',
          email = CONCAT(email, '_banned_', id),
          username = CONCAT(username, '_banned_', id) 
        WHERE id = ?
      `;
    }

    // admin chỉ được "ban" user thường
    else if (roleType === "admin" && role === "admin") {
      deleteSql = `
        UPDATE users 
        SET 
          account_status = 'banned',
          email = CONCAT(email, '_banned_', id),
          username = CONCAT(username, '_banned_', id) 
        WHERE id = ? AND role = 'user'
      `;
    }

    const [result] = await db.query(deleteSql, [id]);

    // Kiểm tra xem có dòng nào bị xóa không nếu có affectedRows = 1
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Không thể xóa tài khoản này (không có quyền xóa).",
      });
    }

    return res.status(200).json({
      message: `Đã xóa tài khoản ${username} thành công.`,
    });
  } catch (error) {
    console.error("Lỗi khi xóa:", error);
    return res.status(500).json({ message: "Lỗi hệ thống." });
  }
};

// Thêm mới profile
export const addNewProfile = async (req, res) => {
  try {
    const { firstName, lastName, gender, dateOfBirth, phone, address } =
      req.body;
    const userId = req.user?.id;

    // Kiểm tra dữ liệu đầu vào
    if (
      !userId ||
      !firstName ||
      !lastName ||
      !gender ||
      !dateOfBirth ||
      !phone ||
      !address
    ) {
      return res.status(400).json({ message: "Thiếu thông tin." });
    }

    // Thêm mới
    const sqlInsert = `
      INSERT INTO user_profile 
      (user_id, first_name, last_name, gender, date_of_birth, phone, address)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(sqlInsert, [
      userId,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      phone,
      address,
    ]);

    return res.status(201).json({
      message: "Thêm mới thông tin cá nhân thành công.",
    });
  } catch (error) {
    console.error("Lỗi khi thêm mới profile:", error);
    return res.status(500).json({ message: "Lỗi hệ thống." });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, gender, dateOfBirth, phone, address } =
      req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Không xác định được người dùng." });
    }

    // lấy profile user
    const [existing] = await db.query(
      "SELECT * FROM user_profile WHERE user_id = ?",
      [userId]
    );

    // Cập nhật các trường
    const sqlUpdate = `
      UPDATE user_profile
      SET first_name=?, last_name=?, gender=?, date_of_birth=?, phone=?, address=?
      WHERE user_id=?
    `;

    await db.query(sqlUpdate, [
      firstName ?? existing[0].first_name,
      lastName ?? existing[0].last_name,
      gender ?? existing[0].gender,
      dateOfBirth ?? existing[0].date_of_birth,
      phone ?? existing[0].phone,
      address ?? existing[0].address,
      userId,
    ]);

    return res.status(200).json({ message: "Cập nhật thông tin thành công!" });
  } catch (error) {
    console.error("Lỗi khi cập nhật profile:", error);
    return res.status(500).json({ message: "Lỗi hệ thống." });
  }
};

// Dọn dẹp refresh token hết hạn
// export const cleanExpiredRefreshToken = async () => {
//   try {
//     await db.query("DELETE FROM user_sessions WHERE expires_at < NOW()");
//     console.log("Đã dọn dẹp Refresh Token hết hạn");
//   } catch (err) {
//     console.error("Lỗi khi dọn Refresh Token:", err);
//   }
// };
