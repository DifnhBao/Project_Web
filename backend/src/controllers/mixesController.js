import * as mixesService from "../service/mixesService.js";

let cachedMixes = null;
let lastGeneratedTime = 0;
const ONE_DAY = 24 * 60 * 60 * 1000;
export async function getDailyMixes(req, res) {
  try {
    const now = Date.now();

    // Nếu có cache và chưa hết 24h trả lại cache
    if (cachedMixes && now - lastGeneratedTime < ONE_DAY) {
      console.log("Using cached daily mixes");
      return res.status(200).json(cachedMixes);
    }

    console.log("Generating NEW daily mixes...");

    const mixesCount = parseInt(req.query.count) || 6;
    const artistsPerMix = parseInt(req.query.artists) || 3;
    const tracksPerArtist = parseInt(req.query.tracks) || 6;

    const mixes = await mixesService.generateDailyMixes({
      mixesCount,
      artistsPerMix,
      tracksPerArtist,
    });

    // Lưu cache
    cachedMixes = mixes;
    lastGeneratedTime = now;

    res.status(200).json(mixes);
  } catch (err) {
    console.error("getDailyMixes error:", err);
    res.status(500).json({ error: "Failed to generate daily mixes" });
  }
}
