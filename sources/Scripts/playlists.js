// playlists.js
export const JAMENDO_CLIENT_ID = "0ffcdfae"; // Thay bằng client_id thật

export async function fetchPlaylists(limit = 10) {
  try {
    // Lấy limit*6 tracks từ Jamendo
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${
      limit * 6
    }`;
    const res = await fetch(url);
    const data = await res.json();
    const tracks = data.results;

    const playlists = [];

    for (let i = 0; i < limit; i++) {
      const songs = tracks.slice(i * 6, (i + 1) * 6).map((track) => ({
        id: track.id,
        title: track.name,
        artist: track.artist_name,
        image: track.album_image,
        audio: track.audio,
        duration: track.duration,
      }));

      playlists.push({
        id: i + 1,
        name: `Playlist ${i + 1}`,
        description: `Playlist từ Jamendo - bộ ${i + 1}`,
        coverImage: songs[0]?.image || "",
        songs,
      });
    }

    return playlists;
  } catch (err) {
    console.error("Lỗi fetch Jamendo:", err);
    return [];
  }
}
