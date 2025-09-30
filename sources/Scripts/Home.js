import { fetchPlaylists } from "./playlists.js";
import { loadLibrary } from "./Library.js";
import { loadMyPlaylist } from "./MyPlaylist.js";

// Menu navigation
let menuItems = document.querySelectorAll(".menu nav a");
menuItems.forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();
    menuItems.forEach(el => el.classList.remove("active"));
    item.classList.add("active");

    let target = item.getAttribute("data-section");
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(target).classList.add("active");

    if (target === "playlist") loadMyPlaylist();
    else if (target === "library") loadLibrary();
  });
});

// Greeting
function getGreeting() {
  const hour = new Date().getHours();
  let greeting = hour >= 5 && hour < 11 ? "Chào buổi sáng!"
    : hour >= 11 && hour < 14 ? "Chào buổi trưa!"
    : hour >= 14 && hour < 18 ? "Chào buổi chiều!"
    : hour >= 18 && hour < 23 ? "Chào buổi tối!"
    : "Chúc bạn ngủ ngon";

  document.getElementById("greeting").innerText = greeting;
}
getGreeting();
setInterval(getGreeting, 60000);

// Render Featured playlists
async function renderFeaturedPlaylists() {
  const container = document.getElementById("featuredPlaylists");
  if (!container) return;

  const playlists = await fetchPlaylists(10); // Lấy 10 playlist
  console.log("Fetched playlists:", playlists); // debug

  container.innerHTML = playlists.map(pl => `
    <div class="playlists-card">
      <img src="${pl.coverImage}" alt="${pl.name}" />
      <div class="playlist-info">
        <strong>${pl.name}</strong><br/>
        ${pl.description}
      </div>
    </div>
  `).join('');
}

document.addEventListener("DOMContentLoaded", renderFeaturedPlaylists);
