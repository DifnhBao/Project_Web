let currentPlaylist = [];
let currentIndex = 0;

const audio = new Audio();
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const songTitle = document.querySelector(".song-tittle");
const artistName = document.querySelector(".artist-name");
const singerImg = document.querySelector(".background-singer img");
const seekBar = document.querySelector(".seek-bar");
const currentTimeEl = document.querySelector(".current-time");
const durationEl = document.querySelector(".music-time");

// Load 1 bài hát
function loadSong(song) {
  audio.src = song.audio;
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
  singerImg.src = song.image || "/images/default.jpg";
  seekBar.value = 0;
  currentTimeEl.textContent = "00:00";
  durationEl.textContent = formatTime(song.duration);

  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

// Format time 00:00
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
}

// Play / Pause
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    audio.pause();
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

// Next
function nextSong() {
  currentIndex = (currentIndex + 1) % currentPlaylist.length;
  loadSong(currentPlaylist[currentIndex]);
  audio.play();
  playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
}

// Prev
function prevSong() {
  currentIndex =
    (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
  loadSong(currentPlaylist[currentIndex]);
  audio.play();
  playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
}

// Cập nhật progress
audio.addEventListener("timeupdate", () => {
  seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Seek khi kéo
seekBar.addEventListener("input", () => {
  audio.currentTime = (seekBar.value / 100) * audio.duration;
});

// Khi hết bài -> tự next
audio.addEventListener("ended", nextSong);

// Gắn sự kiện nút
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Hàm public để nạp playlist từ ngoài
export function setPlaylist(playlist) {
  currentPlaylist = playlist;
  currentIndex = 0;
  loadSong(currentPlaylist[currentIndex]);
}
