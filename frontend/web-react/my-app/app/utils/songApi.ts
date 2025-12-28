import { URL } from "./authApi";
import { Track } from "../types/music";
import { adminFetch, userFetch } from "./refreshToken";

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

// lấy tất cả bài hát có phân trang
export async function fetchSongsForManage({
  page = 1,
  limit = 10,
  search = "",
}) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
  });

  const res = await adminFetch(`${URL}/songs/all?${params}`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
}

export async function updateSong(id: number, data: any) {
  const res = await adminFetch(`${URL}/songs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Update failed");

  return res.json();
}

export async function deleteSong(songId: number) {
  const res = await adminFetch(`${URL}/songs/${songId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Delete song failed");
  }

  return json;
}

// like/unlike song
export async function likeSong(songId: number) {
  const res = await userFetch(`${URL}/songs/${songId}/like`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Like failed");
  return res.json();
}

export async function unlikeSong(songId: number) {
  const res = await userFetch(`${URL}/songs/${songId}/like`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Unlike failed");
  return res.json();
}

export async function getLikeStatus(songId: number) {
  const res = await userFetch(`${URL}/songs/${songId}/like-status`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Fetch like status failed");
  return res.json();
}

export async function fetchLikedSongs() {
  const res = await userFetch(`${URL}/songs/me/favorites`, {
    method: "GET",
    credentials: "include",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Fetch liked songs failed");
  }

  return json.data;
}
