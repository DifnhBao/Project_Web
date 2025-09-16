

// Mock data (sau này thay bằng API)
const playlists = [
  { title: "Chill Vibes", songs: 12 },
  { title: "Workout Mix", songs: 8 },
  { title: "Love Songs", songs: 20 },
  { title: "Hip Hop Hits", songs: 15 },
  { title: "Study Focus", songs: 5 },
  { title: "Party Time", songs: 18 },
];

// Render playlists
function renderPlaylists(container, data) {
  container.innerHTML = "";
  data.forEach((pl) => {
    container.innerHTML += `
      <div class="playlist-card">
        <div class="playlist-thumb"></div>
        <p class="playlist-title">${pl.title}</p>
        <p class="playlist-count">${pl.songs} songs</p>
      </div>
    `;
  });
}

// Load MyPlaylist page
function loadMyPlaylist() {
  const main = document.querySelector(".main");
  main.innerHTML = "";

  const template = document.getElementById("MyPlaylist-template");
  main.appendChild(template.content.cloneNode(true));

  const playlistGrid = document.getElementById("playlistGrid");
  renderPlaylists(playlistGrid, playlists);
}
