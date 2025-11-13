import express from "express";
import { me, login, register, logout } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC ROUTES
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
// router.post("/refresh", refreshAccessToken);

// PRIVATE ROUTE
// router.get("/me", verifyToken("user"), me);
router.get(
  "/me",
  (req, res, next) => {
    console.log("🔥 Route /auth/me được gọi!");
    next();
  },
  verifyToken("user"),
  me
);

export default router;
