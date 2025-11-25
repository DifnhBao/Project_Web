import * as songModel from "../models/songModel.js";

export async function generateDailyMixes({
  mixesCount = 8,
  artistsPerMix = 4,
  tracksPerArtist = 3,
  artistPoolLimit = 200,
} = {}) {
  // 1. get distinct artists
  const artists = await songModel.getDistinctArtists(artistPoolLimit);
  if (!artists || artists.length === 0) return [];

  // shuffle helper
  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  // create mixesCount mixes
  const mixes = [];

  for (let i = 0; i < mixesCount; i++) {
    // choose artistsPerMix random artists
    const chosen = shuffleArray([...artists]).slice(0, artistsPerMix);

    let mixTracks = [];
    let coverImage = null;

    for (const artist of chosen) {
      // fetch tracks for this artist
      const songs = await songModel.getRandomSongsByArtist(
        artist,
        tracksPerArtist
      );
      if (songs.length > 0) {
        // set cover image if not set
        if (!coverImage && songs[0].image_url) coverImage = songs[0].image_url;
        mixTracks = mixTracks.concat(songs);
      }
    }

    // final shuffle whole mix
    mixTracks = shuffleArray(mixTracks);

    mixes.push({
      id: `daily-mix-${i + 1}`,
      title: `Daily Mix ${i + 1}`,
      subtitle: `Based on ${chosen.join(", ")}`,
      artists: chosen,
      coverImage: coverImage || "/images/default-cover.jpg",
      tracks: mixTracks,
    });
  }

  return mixes;
}
