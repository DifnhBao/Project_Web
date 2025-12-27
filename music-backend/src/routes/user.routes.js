const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

const {
  protect,
  isAdmin,
  protectAdmin,
} = require("../midlewares/auth.midleware");

/* --- ROUTES FOR USER --- */

router.get("/me", protect, userController.getUserProfile);

router.put("/me", protect, userController.updateUserProfile);

router.post("/change-password", protect, userController.changeUserPassword);

/* --- ROUTES FOR ADMIN --- */

router.get("/admin/me", protectAdmin, userController.getCurrentAdmin);

router.post("/:id/promote", protect, isAdmin, userController.promoteUser);

router.post("/:id/demote", protect, isAdmin, userController.demoteAdminToUser);

// lấy danh sách user
router.get("/", protectAdmin, userController.getAllUsers);
// lấy danh sách admin
router.get("/admins", protectAdmin, userController.getAllAdmins);

// Lấy thông tin user theo ID
router.get("/profile/:id", protectAdmin, userController.getUserProfileByAdmin);
// Cập nhật thông tin user theo ID
router.put("/profile/:id", protectAdmin, userController.updateUserById);
// Xóa user
router.delete("/:id", protectAdmin, userController.deleteUserById);
// Thêm mới tài khoản admin
router.post("/admin/new", protectAdmin, userController.addNewAdmin);

// Reset password
router.put(
  "/:id/reset-password",
  protect,
  isAdmin,
  userController.resetUserPassword
);

module.exports = router;
