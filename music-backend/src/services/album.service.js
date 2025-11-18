const { Album, Artist } = require('../models');

const getAllAlbums = async () => {
    const albums = await Album.findAll({
        attributes: ['album_id', 'title', 'cover_image'],
        include: [{
            model: Artist,
            attributes: ['name'],
        }]
    });

    return albums;
};


const createAlbum = async (albumData) => {
    const { title, release_date, cover_image, artist_id } = albumData;

    const artist = await Artist.findByPk(artist_id);
    if (!artist) {
        throw new Error('Không tìm thấy nghệ sĩ với ID này!');
    }

    const newAlbum = await Album.create({
        title,
        release_date,
        cover_image,
        artist_id,
    });

    return newAlbum;
};


const updateAlbum = async (albumId, updateData) => {
    const { title, release_date, cover_image, artist_id } = updateData;
    const album = await Album.findByPk(albumId);

    if (!album) throw new Error('Không tìm thấy Album này.');

    album.title = title || album.title;
    album.release_date = release_date || album.release_date;
    album.cover_image = cover_image || album.cover_image;
    album.artist_id = artist_id || album.artist_id;

    await album.save();
    return album;
};


const deleteAlbum = async (albumId) => {
    const album = await Album.findByPk(albumId);
    if (!album) throw new Error('Không tìm thấy album.');

    await album.destroy();
    return {
        message: 'Đã xóa thành công Album.'
    };
};


module.exports = {
    getAllAlbums,
    createAlbum,
    updateAlbum,
    deleteAlbum,
};