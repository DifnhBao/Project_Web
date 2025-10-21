export const JAMENDO_CLIENT_ID = "0ffcdfae";

// Lấy bài hát phổ biến
export async function fetchPopularTracks(limit = 10) {
  const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${limit}&order=popularity_total_desc`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results.map((track: any) => ({
    id: track.id,
    title: track.name,
    artist: track.artist_name,
    image: track.album_image,
    audio: track.audio,
  }));
}

// Lấy playlist có kèm bài hát
export async function fetchPlaylists(limit = 10) {
  const url = `https://api.jamendo.com/v3.0/playlists/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${limit}`;
  const res = await fetch(url);
  const data = await res.json();

  const results = data.results || [];

  // Gọi thêm API để lấy track đầu tiên cho ảnh bìa
  const playlistsWithImages = await Promise.all(
    results.map(async (pl: any) => {
      let coverImage = pl.image || "/images/default-cover.jpg";

      try {
        // Gọi API lấy track đầu tiên trong playlist
        const tracksUrl = `https://api.jamendo.com/v3.0/playlists/tracks/?client_id=${JAMENDO_CLIENT_ID}&id=${pl.id}&limit=1`;
        const tracksRes = await fetch(tracksUrl);
        const tracksData = await tracksRes.json();

        const firstTrack = tracksData.results?.[0]?.tracks?.[0];
        if (firstTrack?.album_image) {
          coverImage = firstTrack.album_image;
        }
      } catch (e) {
        console.warn(`Không lấy được ảnh cho playlist ${pl.name}`);
      }

      return {
        id: pl.id,
        name: pl.name,
        description: pl.description || "No description",
        user: pl.user_name,
        coverImage,
        trackCount: pl.tracks_count,
      };
    })
  );

  return playlistsWithImages;
}

// Lấy danh sách nghệ sĩ
export async function fetchArtists(limit = 8) {
  const url = `https://api.jamendo.com/v3.0/artists/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${limit}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results.map((artist: any) => ({
    id: artist.id,
    name: artist.name,
    image: artist.image,
  }));
}
