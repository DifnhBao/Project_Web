// Mock data (sau này thay bằng API)
const playlists = [
  {
    title: "Chill Vibes",
    songs: 12,
    image:
      "https://image-cdn.nct.vn/playlist/2025/07/25/a/2/1/0/1753435482545_300.jpg",
  },
  { title: "Workout Mix", songs: 8, image: "" },
  { title: "Love Songs", songs: 20, image: "" },
  { title: "Hip Hop Hits", songs: 15, image: "" },
  { title: "Study Focus", songs: 5, image: "" },
  { title: "Party Time", songs: 18, image: "" },
];

// Render playlists
function renderPlaylists(container, playlists) {
  container.innerHTML = playlists
    .map(
      (playlist) =>
        `
      <div class="playlist-card">
        <img src="${playlist.image}" alt="${playlist.name}" />
        <p class="playlist-title">${playlist.title}</p>
        <p class="playlist-count">${playlist.songs} songs</p>
      </div>
    `
    )
    .join("");
}

// Load MyPlaylist page
export function loadMyPlaylist() {
  const playlistGrid = document.getElementById("playlistGrid");
  renderPlaylists(playlistGrid, playlists);
}
