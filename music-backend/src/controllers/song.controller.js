const songService = require("../services/song.service");
const jamendoService = require("../services/jamendo.service");
const cloudinary = require("cloudinary").v2;
const fs = require("fs-extra");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* --- CONTROLLER FOR USER --- */

const createSong = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("Bạn phải upload một file nhạc!");
    }

    const songData = req.body;
    const tempFilePath = req.file.path;

    const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
      folder: "music-app/songs",
      resource_type: "video",
    });

    const audioUrl = uploadResult.secure_url;

    await fs.unlink(tempFilePath);

    const newSong = await songService.createSong(songData, audioUrl);

    res.status(201).json({ message: "Upload THÀNH CÔNG!", data: newSong });
  } catch (error) {
    console.error("LỖI BÊN TRONG SONG CONTROLLER:", error);
    next(error);
  }
};

const getAllSongs = async (req, res, next) => {
  try {
    // Lấy từ khóa từ url
    const { search } = req.query;
    const allSongs = await songService.getAllSongs(search);

    res.status(200).json({
      message: "Lấy bài hát thành công.",
      data: allSongs,
    });
  } catch (error) {
    next(error);
  }
};

const getSongById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await songService.getSongById(id);
    res.status(200).json({
      message: "Lấy bài hát thành công!",
      data: song,
    });
  } catch (error) {
    next(error);
  }
};

async function getSongList(req, res) {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;

    const result = await songService.getSongs({ page, limit });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch songs",
    });
  }
}

/* --- CONTROLLER FOR ADMIN */

const updateSongById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedSong = await songService.updateSongById(id, updateData);

    res.status(200).json({
      message: "Admin cập nhật thành công.",
      data: updatedSong,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSongById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await songService.deleteSongById(id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const toggleSongVisibility = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await songService.toggleSongVisibility(id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSong,
  getAllSongs,
  getSongById,
  updateSongById,
  deleteSongById,
  toggleSongVisibility,
  getSongList,
};
