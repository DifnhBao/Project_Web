import axios from "axios";

export const JAMENDO_CLIENT_ID = "0ffcdfae";

export async function fetchJamendoTracks(limit = 200) {
  const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${limit}`;

  const res = await axios.get(url);
  return res.data.results || [];
}
