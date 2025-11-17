const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre.controller');
const { protect, isAdmin } = require('../midlewares/auth.midleware');

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

module.exports = router;