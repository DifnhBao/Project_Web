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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const result = await songService.getAllSongs({
      page,
      limit,
      search,
    });

    res.status(200).json({
      success: true,
      message: "Lấy danh sách bài hát thành công.",
      ...result,
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
    const rawId = req.params.id;

    // 1. Kiểm tra tồn tại param
    if (!rawId) {
      return res.status(400).json({
        message: "Thiếu ID bài hát.",
      });
    }

    // 2. Ép kiểu + validate
    const songId = parseInt(rawId, 10);

    if (!Number.isInteger(songId) || songId <= 0) {
      return res.status(400).json({
        message: "ID bài hát không hợp lệ.",
      });
    }

    // 3. Gọi service
    const result = await songService.deleteSongById(songId);

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

// POST /songs/:id/like
const likeSong = async (req, res, next) => {
  try {
    const songId = Number(req.params.id);
    const userId = req.user.user_id;

    if (Number.isNaN(songId)) {
      return res.status(400).json({ message: "ID bài hát không hợp lệ." });
    }

    const result = await songService.likeSong(userId, songId);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// DELETE /songs/:id/like
const unlikeSong = async (req, res, next) => {
  try {
    const songId = Number(req.params.id);
    const userId = req.user.user_id;

    if (Number.isNaN(songId)) {
      return res.status(400).json({ message: "ID bài hát không hợp lệ." });
    }

    const result = await songService.unlikeSong(userId, songId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getLikeStatus = async (req, res, next) => {
  try {
    const songId = Number(req.params.id);
    const userId = req.user.user_id;

    if (Number.isNaN(songId)) {
      return res.status(400).json({
        message: "ID bài hát không hợp lệ.",
      });
    }

    const result = await songService.getLikeStatus(userId, songId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getLikedSongs = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const songs = await songService.getLikedSongs(userId);

    res.status(200).json({
      data: songs,
    });
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
  likeSong,
  unlikeSong,
  getLikeStatus,
  getLikedSongs,
};
