const links = document.querySelectorAll(".sidebar a");
const section = document.querySelectorAll(".section");
const pageTitle = document.getElementById("page-title");

links.forEach((link) => {
  link.addEventListener("click", () => {
    event.preventDefault();

    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    section.forEach((sec) => sec.classList.remove("active"));

    const sectionId = link.getAttribute("data-section");
    document.getElementById(sectionId).classList.add("active");

    pageTitle.textContent = link.textContent.trim();
  });
});

const lineCtx = document.getElementById("lineChart").getContext("2d");
new Chart(lineCtx, {
  type: "line",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "New Users",
        data: [30, 25, 35, 28, 40, 55, 12, 70, 5, 30, 23, 20],
        borderColor: " rgb(88 196 220)",
        backgroundColor: "rgba(105, 160, 214, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: "#333" }, ticks: { color: "#ccc" } },
      y: { grid: { color: "#333" }, ticks: { color: "#ccc" } },
    },
  },
});

const barCtx = document.getElementById("barChart").getContext("2d");
new Chart(barCtx, {
  type: "bar",
  data: {
    labels: ["Pop", "Rock", "Hip-Hop", "Jazz", "Classical"],
    datasets: [
      {
        label: "Songs",
        data: [320, 230, 220, 180, 130],
        backgroundColor: [
          "rgba(8, 101, 155, 0.98)",
          "rgba(5,150,105,0.8)",
          "rgba(207, 67, 209, 0.8)",
          "rgba(227, 70, 17, 0.8)",
          "rgba(132,204,22,0.8)",
        ],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: "#333" }, ticks: { color: "#ccc" } },
      y: { grid: { color: "#333" }, ticks: { color: "#ccc" } },
    },
  },
});
