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


const updateGenre = async (genreId, updateData) => {
    const { name, description } = updateData;
    const genre = await Genre.findByPk(genreId);

    if (!genre) throw new Error('Không tìm thấy thể loại này.');

    genre.name = name || genre.name;
    genre.description = description || genre.description;

    await genre.save();
    return genre;
};

const deleteGenre = async (genreId) => {
    const genre = await Genre.findByPk(genreId);
    if (!genre) throw new Error('Không tìm thấy thể loại.');
    await genre.destroy();
    return {
        message: 'Đã xóa thể loại này.'
    };
};

module.exports = {
    getAllGenres,
    createGenre,
    updateGenre,
    deleteGenre,
};