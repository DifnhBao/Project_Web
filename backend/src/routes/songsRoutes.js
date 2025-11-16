import express from "express";
import {
  importSongs,
  listSongs,
  detailSong,
  removeSong,
} from "../controllers/songsController.js";

const router = express.Router();

router.get("/list", listSongs);
router.get("/detail/:id", detailSong);

router.post("/import", importSongs);
router.delete("/remove/:id", removeSong);

export default router;
