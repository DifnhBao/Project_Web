const artistService = require('../services/artist.service');

const getAllArtists = async (req, res, next) => {
    try {
        const artists = await artistService.getAllArtists();
        res.status(200).json({
            message: 'Lấy danh sách nghệ sĩ thành công.',
            data: artists,
        });
    } catch (error) {
        next(error);
    }
};

const createArtist = async (req, res, next) => {
    try {
        const artistData = req.body;
        const newArtist = await artistService.createArtist(artistData);

        res.status(200).json({
            message: 'Tạo nghệ sĩ thành công.',
            data: newArtist,
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getAllArtists,
    createArtist,
}