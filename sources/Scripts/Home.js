function loadPage(page) {
  const main = document.querySelector(".main");
  main.innerHTML = "";

  if (page === "Home") {
    const template = document.getElementById("Home-template");
    main.appendChild(template.content.cloneNode(true));
  } else if (page === "Library") {
    const template = document.getElementById("Library-template");
    main.appendChild(template.content.cloneNode(true));
  } else if (page === "MyPlaylist") {
    loadMyPlaylist(); // gọi hàm trong MyPlaylist.js
  }
}

// Trang mặc định
loadPage("Home");
