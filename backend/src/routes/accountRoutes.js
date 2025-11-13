import express from "express";
import {
  deleteAccount,
  addNewProfile,
  updateProfile,
} from "../controllers/accountController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.delete("/account/:id", verifyToken("admin"), deleteAccount);
// Đẩy thông tin các nhân lần đầu tiên
router.post("/profile", verifyToken(), addNewProfile);
// cập nhật thông tin cá nhân
router.patch("/profile", verifyToken(), updateProfile);

export default router;
