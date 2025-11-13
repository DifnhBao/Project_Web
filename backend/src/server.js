import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import authAdminRoutes from "./routes/authAdminRoutes.js";
import userRoutes from "./routes/getUserRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
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

// Sử dụng routes
app.use("/auth", authRoutes);
app.use("/auth-admin", authAdminRoutes);
app.use("/users", userRoutes);
app.use("/acc", accountRoutes);

// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
