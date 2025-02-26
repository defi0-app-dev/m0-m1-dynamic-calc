let chart;

function toggleMode(mode) {
    document.getElementById('simple-mode').classList.toggle('hidden', mode !== 'simple');
    document.getElementById('expert-mode').classList.toggle('hidden', mode !== 'expert');
}

function calculateM1(m0, reserveRatio) {
    let multiplier = 1 / (reserveRatio / 100);
    return m0 * multiplier;
}

function updateSimpleMode() {
    let m0 = parseFloat(document.getElementById('m0').value) || 0;
    let m1 = calculateM1(m0, 10);
    document.getElementById('m1-output').textContent = m1.toFixed(2);
    updateChart(m0, m1);
}

function updateExpertMode() {
    let m0 = parseFloat(document.getElementById('m0-expert').value) || 0;
    let reserveRatio = parseFloat(document.getElementById('reserve-ratio').value);
    document.getElementById('reserve-value').textContent = reserveRatio + '%';
    
    let m1 = calculateM1(m0, reserveRatio);
    document.getElementById('m1-expert-output').textContent = m1.toFixed(2);
    
    let multiplier = (1 / (reserveRatio / 100)).toFixed(2);
    document.getElementById('multiplier-output').textContent = multiplier;
    
    updateChart(m0, m1);
}

function updateChart(m0 = 1000, m1 = 10000) {
    let ctx = document.getElementById('moneyChart').getContext('2d');
    if (chart) {
        chart.data.datasets[0].data = [m0, m1];
        chart.update();
    } else {
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['M0 (Base Money)', 'M1 (Total Money Supply)'],
                datasets: [{
                    label: 'Money Supply Breakdown',
                    data: [m0, m1],
                    backgroundColor: ['blue', 'green']
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateSimpleMode();
});
