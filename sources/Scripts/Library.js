const songs = [
  {
    id: 1,
    image: "https://picsum.photos/200?random=1",
    title: "Phép Màu",
    artist: "Hoàng Dũng",
    duration: "04:12",
  },
  {
    id: 2,
    image: "https://picsum.photos/200?random=2",
    title: "Tháng Tư Là Lời Nói Dối Của Em",
    artist: "Hà Anh Tuấn",
    duration: "05:03",
  },
  {
    id: 3,
    image: "https://picsum.photos/200?random=3",
    title: "Nàng Thơ",
    artist: "Hoàng Dũng",
    duration: "04:21",
  },
];

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


