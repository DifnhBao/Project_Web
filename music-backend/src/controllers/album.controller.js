const albumService = require('../services/album.service');

const getAllAlbums = async (req, res, next) => {
    try {
        const albums = await albumService.getAllAlbums();
        res.status(200).json({
            message: 'Lấy danh sách album thành công',
            data: albums,
        });
    } catch (error) {
        next(error);
    }
};

const createAlbum = async (req, res, next) => {
    try {
        const newAlbum = await albumService.createAlbum(req.body);

        res.status(200).json({
            message: 'Tạo album thành công.',
            data: newAlbum,
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getAllAlbums,
    createAlbum,
};