import express from "express";
import { getDailyMixes } from "../controllers/mixesController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/daily-mix", getDailyMixes);

export default router;
