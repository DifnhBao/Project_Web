const { Song, Artist, Album, Genre } = require('../models');
const { Op } = require('sequelize');
const cloudinary = require('cloudinary').v2;

/* --- CHỨC NĂNG CHO USER --- */

const createSong = async (songData, audioUrl) => {
    const { title, artist_id, album_id, genre_id, duration } = songData;

    const newSong = await Song.create({
        title,
        artist_id,
        album_id,
        genre_id,
        duration: parseInt(duration) || 0,
        audio_url: audioUrl,
        view_count: 0
    });

    return newSong;
};

// Lấy tất cả bài hát
const getAllSongs = async (keyword) => {
    let condition = { is_visible: true };

    if (keyword) {
        condition = {
            ...condition, // giữ nguyên điều kiện của condition
            title: {
                [Op.like]: `%${keyword}%`
            }
        };
    }

    // gọi db
    const songs = await Song.findAll({
        where: condition,
        include: [
            {
                model: Artist,
                attributes: ['name', 'image'],
            },

            {
                model: Album
                ,
                attributes: ['title', 'cover_image'],
            },

            {
                model: Genre,
                attributes: ['name'],
            },
        ],
        attributes: {
            exclude: ['artist_id', 'album_id', 'genre_id'],
        }
    });

    return songs;
};

// Lấy một bài hát
const getSongById = async (songId) => {
    const song = Song.findByPk(songId, {
        include: [
            { model: Artist },
            { model: Album },
            { model: Genre },
        ]
    });

    if (!song) {
        throw new Error('Không tìm thấy bài hát với ID này!');
    }

    if (song.is_visible === false) {
        throw new Error('Bài hát này hiện không khả dụng.');
    }

    return song;
};


/* --- CHỨC NĂNG CHO ADMIN */

const updateSongById = async (songId, updateData) => {
    const { title, artist_id, album_id, genre_id, duration } = updateData;

    const song = await Song.findByPk(songId);
    if (!song) throw new Error('Không tìm thấy bài hát.');

    song.title = title || song.title;
    song.artist_id = artist_id || song.artist_id;
    song.album_id = album_id || song.album_id;
    song.genre_id = genre_id || song.genre_id;
    song.duration = duration || song.duration;

    await song.save();
    return song;
};


const deleteSongById = async (songId) => {
    const song = await Song.findByPk(songId);
    if (!song) throw new Error('Không tìm thấy bài hát.');

    const urlParts = song.audio_url.split('/');
    const publicIdWithFolder = urlParts.slice(urlParts.indexOf('music-app')).join('/').split('.')[0];

    await cloudinary.uploader.destroy(publicIdWithFolder, {
        resource_type: 'video',
    });

    await song.destroy();

    return {
        message: `Đã xóa thành công bài hát ${song.title}.`
    };
};


const toggleSongVisibility = async (songId) => {
    const song = await Song.findByPk(songId);
    if (!song) throw new Error('Không tìm thấy bài hát.');

    // Ẩn/Hiện bài hát
    song.is_visible = !song.is_visible;
    await song.save();

    const status = song.is_visible ? "Hiện" : "Ẩn";
    return {
        message: `Đã đổi trạng thái bài hát thành ${status}.`
    };
}



module.exports = {
    createSong,
    getAllSongs,
    getSongById,
    updateSongById,
    deleteSongById,
    toggleSongVisibility,
};

