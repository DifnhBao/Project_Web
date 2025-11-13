import express from "express";
import {
  me,
  approveAdmin,
  registerAdmin,
  loginAdmin,
  logoutAmin,
  refreshAccessTokenWithAdmin,
  addNewAdmin,
} from "../controllers/authAdminController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 1. Đăng ký tài khoản admin (mặc định status = 'pending')
router.post("/register-admin", registerAdmin);
// 3. Đăng nhập admin
router.post("/login-admin", loginAdmin);
// 4. Đăng xuất
router.post("/logout-admin", logoutAmin);

router.post("/refresh", refreshAccessTokenWithAdmin);

// private
router.get("/me", verifyToken("admin"), me);
// Duyệt admin (chỉ admin mới có quyền)
router.put("/approve-admin/:id", verifyToken("admin"), approveAdmin);
// Thêm tài khoản admin
router.put("/add-new-admin", verifyToken("admin"), addNewAdmin);

export default router;
