const express = require('express');
const router = express.Router();
const songController = require('../controllers/song.controller');
const { protect, isAdmin } = require('../midlewares/auth.midleware');
const upload = require('../midlewares/upload.midleware');

/* --- ROUTES FOR USER --- */

router.post(
    '/',
    protect,
    isAdmin,
    upload.single('audioFile'),
    songController.createSong,
);

router.get(
    '/',
    songController.getAllSongs,
);

router.get(
    '/:id',
    songController.getSongById,
);

/* --- ROUTES FOR ADMIN --- */

router.put(
    '/:id',
    protect,
    isAdmin,
    songController.updateSongById,
);

router.delete(
    '/:id',
    protect,
    isAdmin,
    songController.deleteSongById,
);

router.patch(
    '/:id/toggle-invisibility',
    protect,
    isAdmin,
    songController.toggleSongVisibility,
)

module.exports = router;