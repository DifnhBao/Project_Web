// script.js
// Ghi chú: đảm bảo Chart.js đã được import trước file này!
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
// <script src="script.js"></script>

document.addEventListener("DOMContentLoaded", function () {
    // --- LINE CHART (S-lineChart) ---
    const lineCanvas = document.getElementById("S-lineChart");
    if (lineCanvas) {
        const lineCtx = lineCanvas.getContext("2d");

        // sample data 30 ngày (anh thay bằng API/real data khi cần)
        const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
        const lineData = [5, 7, 10, 14, 18, 22, 25, 29, 32, 34, 37, 41, 45, 49, 53, 56, 59, 63, 67, 70, 73, 76, 80, 83, 87, 90, 94, 97, 99, 100];

        new Chart(lineCtx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Daily Plays",
                    data: lineData,
                    borderColor: "#3ddc97",
                    pointBackgroundColor: "#fff",
                    pointRadius: 3,
                    tension: 0.32,
                    fill: true,
                    backgroundColor: "rgba(61,220,151,0.12)"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // dùng chiều cao CSS
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        ticks: { color: "#bfcfcf", maxRotation: 0 },
                        grid: { color: "rgba(255,255,255,0.04)" }
                    },
                    y: {
                        ticks: { color: "#bfcfcf" },
                        grid: { color: "rgba(255,255,255,0.04)" }
                    }
                }
            }
        });
    }

    // --- DOUGHNUT / CIRCLE CHART (circleChart) ---
    const circleCanvas = document.getElementById("circleChart");
    if (circleCanvas) {
        const circleCtx = circleCanvas.getContext("2d");

        new Chart(circleCtx, {
            type: "doughnut",
            data: {
                labels: ["Pop", "R&B", "Rock", "Hip-Hop"],
                datasets: [{
                    data: [40, 10, 25, 25],
                    backgroundColor: ["#3ddc97", "#36cfc9", "#f87171", "#facc15"],
                    borderColor: "rgba(0,0,0,0)",
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "70%",
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: { color: "#bfcfcf" }
                    }
                }
            }
        });
    }

});
