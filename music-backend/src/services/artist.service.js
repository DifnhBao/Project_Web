const { Artist } = require('../models');

const getAllArtists = async () => {
    const artists = await Artist.findAll({
        attributes: ['artist_id', 'name', 'image'],
    });
    return artists;
};

// Quyền Admin: tạo nghệ sĩ mới

const createArtist = async (artistData) => {
    const { name, bio, image, country } = artistData;

    const existingArtist = await Artist.findOne({ where: { name } });
    if (existingArtist) {
        throw new Error('Nghệ sĩ này đã tồn tại.');
    }

    const newArtist = await Artist.create({
        name,
        bio,
        image,
        country,
    });

    return newArtist;
};

module.exports = {
    getAllArtists,
    createArtist,
};