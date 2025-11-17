const genreService = require('../services/genre.service');

const getAllGenres = async (req, res, next) => {
    try {
        const genres = await genreService.getAllGenres();
        res.status(200).json({
            message: 'Lấy danh sách thể loại thành công',
            data: genres,
        });
    } catch (error) {
        next(error);
    }
};

const createGenre = async (req, res, next) => {
    try {
        const newGenre = await genreService.createGenre(req.body);

        res.status(200).json({
            message: 'Tạo thể loại thành công.',
            data: newGenre,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllGenres,
    createGenre,
}
