const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre.controller');
const { protect, isAdmin } = require('../midlewares/auth.midleware');
const { route } = require('./user.routes');

// API tạo thể loại
// POST/api/genres

router.post(
    '/',
    protect,
    isAdmin,
    genreController.createGenre,
);

// API lay tat ca the loai
// GET/api/genres

router.get(
    '/',
    genreController.getAllGenres,
);

router.put(
    '/:id',
    protect,
    isAdmin,
    genreController.updateGenre
);

router.delete(
    '/:id',
    protect,
    isAdmin,
    genreController.deleteGenre
)

module.exports = router;