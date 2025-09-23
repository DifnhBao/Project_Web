const playPauseBtn = document.getElementById("playPauseBtn");
let isPlaying = false;

playPauseBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    playPauseBtn.textContent = isPlaying ? "⏸️ Pause" : "▶️ Play";
});