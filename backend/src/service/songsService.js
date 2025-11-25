import db from "../config/db.js";

export async function insertOrUpdateSong(song) {
  const sql = `
    INSERT INTO songs (jamendo_id, title, artist_name, playlist_name, image_url, audio_url, duration)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      title = VALUES(title),
      artist_name = VALUES(artist_name),
    playlist_name = VALUES(playlist_name),
      image_url = VALUES(image_url),
      audio_url = VALUES(audio_url),
      duration = VALUES(duration)
  `;

  await db.query(sql, [
    song.jamendo_id,
    song.title,
    song.artist_name,
    song.playlist_name,
    song.image_url,
    song.audio_url,
    song.duration,
  ]);
}

export async function getAllSongs() {
  const [rows] = await db.query("SELECT * FROM songs ORDER BY id DESC");
  return rows;
}

export async function getRandomSongs(quantity = 12) {
  const [rows] = await db.query("SELECT * FROM songs ORDER BY RAND() LIMIT ?", [
    quantity,
  ]);
  return rows;
}

export async function getSongById(id) {
  const [rows] = await db.query("SELECT * FROM songs WHERE id = ?", [id]);
  return rows[0];
}

export async function deleteSong(id) {
  await db.query("DELETE FROM songs WHERE id = ?", [id]);
}
