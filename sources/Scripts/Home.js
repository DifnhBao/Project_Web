function loadPage(page) {
  const main = document.querySelector(".main");
  main.innerHTML = "";

  if (page === "Home") {
    if (main.classList.contains("main-of-library")) {
      main.classList.remove("main-of-library");
    }

    const template = document.getElementById("Home-template");
    const clone = template.content.cloneNode(true);
    main.append(clone);
  } else if (page === "Library") {
    main.classList.add("main-of-library");

    const template = document.getElementById("Library-template");
    const clone = template.content.cloneNode(true);
    main.appendChild(clone);
  }
}

loadPage("Home");
