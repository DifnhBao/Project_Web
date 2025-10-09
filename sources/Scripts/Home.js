import { fetchPlaylists } from "./playlists.js";
import { loadLibrary } from "./Library.js";
import { loadMyPlaylist } from "./MyPlaylist.js";
import { setPlaylist } from "./Player.js";

// Menu navigation
let menuItems = document.querySelectorAll(".menu a");

menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    const target = item.dataset.section;

    // Xóa active khỏi tất cả
    menuItems.forEach((el) => el.classList.remove("active"));
    document
      .querySelectorAll(".section")
      .forEach((sec) => sec.classList.remove("active"));

    // Thêm active cho cái được chọn
    item.classList.add("active");
    document.getElementById(target)?.classList.add("active"); // thêm ? để tránh lỗi null

    if (target === "playlist" && typeof loadMyPlaylist === "function")
      loadMyPlaylist();
    else if (target === "library" && typeof loadLibrary === "function")
      loadLibrary();
  });
});

// Greeting
function getGreeting() {
  const hour = new Date().getHours();
  let greeting =
    hour >= 5 && hour < 11
      ? "Chào buổi sáng!"
      : hour >= 11 && hour < 14
      ? "Chào buổi trưa!"
      : hour >= 14 && hour < 18
      ? "Chào buổi chiều!"
      : hour >= 18 && hour < 23
      ? "Chào buổi tối!"
      : "Chúc bạn ngủ ngon";

  document.getElementById("greeting").innerText = greeting;
}
getGreeting();
setInterval(getGreeting, 60000);

// Render Featured playlists
async function renderFeaturedPlaylists() {
  const container = document.getElementById("featuredPlaylists");
  if (!container) return;

  const playlists = await fetchPlaylists(20); // Lấy 20 playlist

  container.innerHTML = playlists
    .map(
      (pl, index) => `
      <div class="playlists-card" data-index="${index}">
        <div class="playlist-img">
          <img src="${pl.coverImage}" alt="${pl.name}" />
        </div>
        <div class="playlist-info">
          <strong>${pl.name}</strong>
          <p>${pl.description}</p>
        </div>
      </div>
    `
    )
    .join("");

  // Khi click playlist -> load vào player
  container.querySelectorAll(".playlists-card").forEach((card, index) => {
    card.addEventListener("click", () => {
      setPlaylist(playlists[index].songs);
    });
  });
}

document.addEventListener("DOMContentLoaded", renderFeaturedPlaylists);

//BANNER
const bannerRow = document.querySelector(".banner-row");
const leftBtn = document.querySelector(".banner-btn.left");
const rightBtn = document.querySelector(".banner-btn.right");

leftBtn.addEventListener("click", () => {
  bannerRow.scrollBy({ left: -1500, behavior: "smooth" });
});

rightBtn.addEventListener("click", () => {
  bannerRow.scrollBy({ left: 1500, behavior: "smooth" });
});
