import express from "express";
import { getAllUsers, getAllAdmins } from "../controllers/getDataController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all-users", verifyToken("admin"), getAllUsers);
router.get("/all-admins", verifyToken("admin"), getAllAdmins);

export default router;
