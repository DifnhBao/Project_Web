import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import authAdminRoutes from "./routes/authAdminRoutes.js";
import refreshTokenRoutes from "./routes/refreshTokenRoutes.js";
import userRoutes from "./routes/getUserRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import songsRoutes from "./routes/songsRoutes.js";
import mixesRoutes from "./routes/mixesRoutes.js";
// import { cleanExpiredRefreshToken } from "./controllers/accountController.js";
import "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// // health
// app.get("/", (req, res) => res.json({ ok: true }));
// // check DB connection
// app.get("/api/health/db", async (req, res) => {
//   try {
//     const [rows] = await pool.query("SELECT 1 AS ok");
//     res.json({ ok: rows[0].ok === 1 });
//   } catch (e) {
//     res.status(500).json({ ok: false, error: e.message });
//   }
// });

// Sử dụng routes
app.use("/auth", authRoutes);
app.use("/auth-admin", authAdminRoutes);
app.use("/refresh", refreshTokenRoutes);
app.use("/users", userRoutes);
app.use("/acc", accountRoutes);
app.use("/songs", songsRoutes);
app.use("/mixes", mixesRoutes);

// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));