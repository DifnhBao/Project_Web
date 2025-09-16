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

const ctx = document.getElementById("myChart");
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Registrations",
        data: [12, 19, 14, 25, 30, 22],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 5,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  },
});
