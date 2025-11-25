import db from "../config/db.js";

export async function getDistinctArtists(limit = 1000) {
  const sql = `SELECT DISTINCT artist_name FROM songs WHERE artist_name IS NOT NULL LIMIT ?`;
  const [rows] = await db.query(sql, [limit]);
  // rows: [{ artist_name: 'A' }, ...]
  return rows.map((row) => row.artist_name);
}

export async function getRandomSongsByArtist(artistName, limit = 10) {
  const sql = `
    SELECT id, jamendo_id, title, artist_name, image_url, audio_url, duration
    FROM songs
    WHERE artist_name = ?
    ORDER BY RAND()
    LIMIT ?
  `;
  const [rows] = await db.query(sql, [artistName, limit]);
  return rows;
}

export async function getTotalSongCount() {
  const [rows] = await db.query("SELECT COUNT(*) AS c FROM songs");
  return rows[0].c;
}
