const lineCtx = document.getElementById('lineChart').getContext('2d');
new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'New Users',
            data: [30, 25, 35, 28, 40, 55, 12, 70, 5, 30, 23, 20],
            borderColor: 'rgba(34, 209, 107, 1)',
            backgroundColor: 'rgba(131, 237, 141, 0.2)',
            fill: true,
            tension: 0.4,
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { color: '#333' }, ticks: { color: '#ccc' } },
            y: { grid: { color: '#333' }, ticks: { color: '#ccc' } }
        }
    }
});

const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['Pop', 'Rock', 'Hip-Hop', 'Jazz', 'Classical'],
        datasets: [{
            label: 'Songs',
            data: [320, 230, 220, 180, 130],
            backgroundColor: [
                'rgba(16,185,129,0.8)',
                'rgba(5,150,105,0.8)',
                'rgba(34,197,94,0.8)',
                'rgba(22,163,74,0.8)',
                'rgba(132,204,22,0.8)'
            ]
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { color: '#333' }, ticks: { color: '#ccc' } },
            y: { grid: { color: '#333' }, ticks: { color: '#ccc' } }
        }
    }
});

