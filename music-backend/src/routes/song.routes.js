const express = require("express");
const router = express.Router();
const songController = require("../controllers/song.controller");
const jamendoController = require("../controllers/jamendo.controller");
const { protect, isAdmin } = require("../midlewares/auth.midleware");
const upload = require("../midlewares/upload.midleware");

/* --- ROUTES FOR USER --- */

router.get("/", songController.getSongList);

// router.post(
//   "/",
//   protect,
//   isAdmin,
//   upload.single("audioFile"),
//   songController.createSong
// );

router.get("/", songController.getAllSongs);

router.get("/:id", songController.getSongById);

/* --- ROUTES FOR ADMIN --- */

router.put("/:id", protect, isAdmin, songController.updateSongById);

router.delete("/:id", protect, isAdmin, songController.deleteSongById);

router.patch(
  "/:id/toggle-invisibility",
  protect,
  isAdmin,
  songController.toggleSongVisibility
);

// gọi 1 lần để lấy 200 bài
router.post("/sync", jamendoController.fetchRandomJamendoTracks);

module.exports = router;
