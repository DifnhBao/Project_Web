import { playlists } from "./playlists.js";

// Menu navigation
let menuItems = document.querySelectorAll(".menu nav a");

menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    // Active menu
    menuItems.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");

    // Toggle section
    let target = item.getAttribute("data-section");
    document
      .querySelectorAll(".section")
      .forEach((sec) => sec.classList.remove("active"));
    document.getElementById(target).classList.add("active");

    // Render playlist nếu là My Playlist
    if (target === "playlist") {
      loadMyPlaylist();
    } else if (target === "library") {
      loadLibrary();
    }
  });
});

// Greeting
function getGreeting() {
  const now = new Date();
  const hour = now.getHours();
  let greeting;

  if (hour >= 5 && hour < 11) greeting = "Chào buổi sáng!";
  else if (hour >= 11 && hour < 14) greeting = "Chào buổi trưa!";
  else if (hour >= 14 && hour < 18) greeting = "Chào buổi chiều!";
  else if (hour >= 18 && hour < 23) greeting = "Chào buổi tối!";
  else greeting = "Chúc bạn ngủ ngon";

  document.getElementById("greeting").innerText = greeting;
}
getGreeting();
setInterval(getGreeting, 60000);

// Render Featured playlists ở trang Home
let featured = document.getElementById("featuredPlaylists");
featured.innerHTML = playlists
  .map(
    (playlist) =>
      `
      <div class="playlists-card">
        <img src="${playlist.coverImage}" alt="${playlist.name}" />
        <div class="playlist-info">${playlist.name}</div>
      </div>
    `
  )
  .join("");
