import { songs } from "./Songs.js";

function renderLibrary(container, songs) {
  container.innerHTML = songs
    .map(
      (song) =>
        `
        <div class="row">
          <div class="col index">${song.id}</div>
          <div class="col title">
              <img src="${song.image}" />
              <span>${song.title}</span>
          </div>
          <div class="col artist">${song.artist}</div>
          <div class="col duration">${song.duration}</div>
        </div>
    `
    )
    .join("");
}

// Load MyPlaylist page
export function loadLibrary() {
  const libraryTable = document.getElementById("rowTable");
  renderLibrary(libraryTable, songs);
}
