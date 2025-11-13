import express from "express";
import {
  getAllUsers,
  getAllAdmins,
  getUserProfile,
} from "../controllers/getDataController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { ignoreCache } from "../middleware/ignoreCache.js";

const router = express.Router();

router.get("/all-users", verifyToken("admin"), getAllUsers);
router.get("/all-admins", verifyToken("admin"), getAllAdmins);
router.get(
  "/user-profile/:userId",
  ignoreCache,
  verifyToken("admin"),
  getUserProfile
);

export default router;
