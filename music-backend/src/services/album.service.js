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

module.exports = {
    getAllAlbums,
    createAlbum,
};