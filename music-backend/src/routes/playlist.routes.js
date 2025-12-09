const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlist.controller');
const { protect } = require('../midlewares/auth.midleware');
const { route } = require('./auth.routes');


router.use(protect);

// 1. Tao Playlist
router.post(
    '/',
    playlistController.createPlaylist
);


// 2. Lay tat ca playlist
router.get(
    '/me',
    playlistController.getMyPlaylists
);


// 3. Xoa playlist
router.delete(
    '/:id',
    playlistController.deletePlaylist
);


// 4. Them bai hat vao playlist
router.post(
    '/:id/songs',
    playlistController.addSongToPlaylist
);


// 5. Xoa bai hat khoi playlist
router.delete(
    '/:id/songs/:songId',
    playlistController.removeSongFromPlaylist
);


module.exports = router;