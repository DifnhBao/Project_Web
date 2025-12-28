import { URL } from "./authApi";
import { Track } from "../types/music";

export async function fetchDailySongs(): Promise<Track[]> {
  const res = await fetch(`${URL}/songs?page=1&limit=20`);
  if (!res.ok) {
    throw new Error("Failed to fetch songs");
  }

  const data = await res.json();

  // MAP từ backend → frontend
  return data.songs.map(
    (song: any): Track => ({
      trackId: song.song_id,
      jamendoId: song.jamendo_id,
      title: song.title,
      duration: song.duration,
      imageUrl: song.image_url,
      audioUrl: song.audio_url,
      artistName: song.artist_name,
      albumName: song.album_name,
      genre: song.genre,
      viewCount: song.view_count,
      isVisible: song.is_visible,
      fetched_at: song.fetched_at,
    })
  );
}
