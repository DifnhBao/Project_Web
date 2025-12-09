import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  importSongs,
  listSongs,
  randomSongs,
  detailSong,
  removeSong,
} from "../controllers/songsController.js";

const router = express.Router();

router.get("/list", listSongs);
router.get("/daily-song", randomSongs);
router.get("/detail/:id", detailSong);

router.post("/import", importSongs);
router.delete("/remove/:id", removeSong);

export default router;
