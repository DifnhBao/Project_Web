const { Genre } = require('../models');

const getAllGenres = async () => {
    const genres = await Genre.findAll({
        attributes: ['genre_id', 'name']
    });

    return genres;
}


const createGenre = async (genreData) => {
    const { name, description } = genreData;

    const existingGenre = await Genre.findOne({ where: { name } });
    if (existingGenre) {
        throw new Error('Thể loại này đã tồn tại rồi.');
    }

    const newGenre = await Genre.create({
        name,
        description,
    });

    return newGenre;
}

module.exports = {
    getAllGenres,
    createGenre,
};