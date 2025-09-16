// Lấy tất cả các menu item
let menuItems = document.querySelectorAll(".menu nav a");

// Lặp qua từng menu item
for (let i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener("click", function (e) {
    e.preventDefault();

    // Bỏ class active ở tất cả menu
    for (let j = 0; j < menuItems.length; j++) {
      menuItems[j].classList.remove("active");
    }
    this.classList.add("active");

    // Ẩn tất cả section
    let sections = document.querySelectorAll(".section");
    for (let k = 0; k < sections.length; k++) {
      sections[k].classList.remove("active");
    }

    // Hiện section tương ứng
    let target = this.getAttribute("data-section");
    let section = document.getElementById(target);
    section.classList.add("active");

    // Nếu là playlist thì gọi render
    if (target === "playlist") {
      loadMyPlaylist();
    }
  });
}

function getGreeting() {
  const now = new Date();
  const hour = now.getHours();
  let greeting;

  if (hour >= 5 && hour < 11) {
    greeting = "Chào buổi sáng";
  } else if (hour >= 11 && hour < 14) {
    greeting = "Chào buổi trưa";
  } else if (hour >= 14 && hour < 18) {
    greeting = "Chào buổi chiều";
  } else if (hour >= 18 && hour < 23) {
    greeting = "Chào buổi tối";
  } else {
    greeting = "Chúc bạn ngủ ngon";
  }

  document.getElementById("greeting").innerText = greeting;
}

// Gọi ngay khi load
getGreeting();
//cập nhật liên tục
setInterval(getGreeting, 60000);
