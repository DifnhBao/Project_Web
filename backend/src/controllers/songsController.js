import {
  insertOrUpdateSong,
  getAllSongs,
  getRandomSongs,
  getSongById,
  deleteSong,
} from "../service/songsService.js";

import { fetchJamendoTracks } from "../utils/jamendo.js";

export const importSongs = async (req, res) => {
  try {
    const tracks = await fetchJamendoTracks(200);

    for (const track of tracks) {
      await insertOrUpdateSong({
        jamendo_id: track.id,
        title: track.name,
        artist_name: track.artist_name,
        playlist_name: track.playlist_name,
        image_url: track.album_image,
        audio_url: track.audio,
        duration: track.duration,
      });
    }

    res.json({ message: "Imported successfully", count: tracks.length });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Import failed" });
  }
};

export const listSongs = async (req, res) => {
  const songs = await getAllSongs();
  res.json(songs);
};

export const randomSongs = async (req, res) => {
  const songs = await getRandomSongs();
  res.json(songs);
};

export const detailSong = async (req, res) => {
  const song = await getSongById(req.params.id);
  res.json(song);
};

export const removeSong = async (req, res) => {
  await deleteSong(req.params.id);
  res.json({ message: "Xóa thành công." });
};
