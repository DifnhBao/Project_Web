const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album.controller');
const { protect, isAdmin } = require('../midlewares/auth.midleware');

// API tao album - POST/api/albums

router.post(
    '/',
    protect,
    isAdmin,
    albumController.createAlbum,
);

// API lay album - GET/api/albums

router.get(
    '/',
    albumController.getAllAlbums,
);

router.put(
    '/:id',
    protect,
    isAdmin,
    albumController.updateAlbum,
);

router.delete(
    '/:id',
    protect,
    isAdmin,
    albumController.deleteAlbum,
);


module.exports = router;