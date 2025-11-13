import db from "../config/db.js";

export const getAllUsers = async (req, res) => {
  try {
    const sql =
      "SELECT id, username, email, role, activity_status FROM users WHERE account_status != 'banned' AND role = 'user' ORDER BY activity_status";

    // Vì db là promise pool => query() trả về [fields]
    const [results] = await db.query(sql);

    if (results.length === 0) {
      return res.status(404).json({ message: "Users rỗng." });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error("Lỗi khi truy xuất users:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const sql =
      "SELECT id, username, email, role, account_status FROM users WHERE account_status != 'banned' AND (role = 'admin' OR role = 'super_admin') ORDER BY account_status DESC";

    // Vì db là promise pool => query() trả về [fields]
    const [results] = await db.query(sql);

    if (results.length === 0) {
      return res.status(404).json({ message: "Admins rỗng." });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error("Lỗi khi truy xuất admins:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
