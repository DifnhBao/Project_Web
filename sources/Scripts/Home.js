const links = document.querySelectorAll(".menu a");
const sections = document.querySelectorAll(".section");
const pageTitle = document.getElementById("page-title");

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    sections.forEach((sec) => sec.classList.remove("active"));
    const sectionId = link.getAttribute("data-section");
    document.getElementById(sectionId).classList.add("active");

    pageTitle.textContent = link.textContent.trim();
  });
});

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
