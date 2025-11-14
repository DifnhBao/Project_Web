import express from "express";
import { refreshAccessToken } from "../controllers/refreshTokenController.js";

const router = express.Router();

router.post("/admin-refresh", refreshAccessToken("admin"));
router.post("/user-refresh", refreshAccessToken());

export default router;
