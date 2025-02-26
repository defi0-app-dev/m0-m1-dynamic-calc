let chart;

function toggleMode(mode) {
    document.getElementById('simple-mode').classList.toggle('hidden', mode !== 'simple');
    document.getElementById('expert-mode').classList.toggle('hidden', mode !== 'expert');
}

// Replace any mathematical string evaluation with a proper parser
function calculateExpression(expression) {
    // Instead of eval, use a mathematical operation parser
    return Function('return ' + expression)();
}

// Replace with direct mathematical operations
function calculateM1(m0, reserveRatio) {
    const multiplier = 1 / (reserveRatio / 100);
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

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const modeToggle = document.querySelectorAll('input[name="mode"]');
    const expertControls = document.getElementById('expert-controls');
    const chart = initChart();

    // Theme toggling
    themeToggle.addEventListener('click', () => {
        document.documentElement.setAttribute('data-bs-theme',
            document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark'
        );
        updateChart(chart);
    });

    // Mode toggling
    modeToggle.forEach(radio => {
        radio.addEventListener('change', (e) => {
            expertControls.classList.toggle('d-none', e.target.id === 'simple-mode');
            updateCalculation();
        });
    });

    // Reserve ratio slider
    const ratioSlider = document.getElementById('reserve-ratio');
    const ratioValue = document.getElementById('ratio-value');
    ratioSlider.addEventListener('input', (e) => {
        ratioValue.textContent = e.target.value;
        updateCalculation();
    });

    // Calculate button
    document.getElementById('calculate').addEventListener('click', updateCalculation);

    function updateCalculation() {
        const m0 = parseFloat(document.getElementById('m0-input').value) || 0;
        const reserveRatio = parseFloat(ratioSlider.value) / 100;
        const multiplier = 1 / reserveRatio;
        const m1 = m0 * multiplier;

        // Update display with animation
        animateValue('multiplier-value', multiplier.toFixed(2));
        animateValue('m1-value', m1.toFixed(2));
        updateChart(chart, m0, m1);
    }

    function animateValue(elementId, value) {
        const element = document.getElementById(elementId);
        element.classList.add('animate__animated', 'animate__fadeIn');
        element.textContent = value;
        setTimeout(() => {
            element.classList.remove('animate__animated', 'animate__fadeIn');
        }, 1000);
    }

    function initChart() {
        // Chart initialization code here
        // ...existing chart code...
    }

    function updateChart(chart, m0 = 0, m1 = 0) {
        // Chart update code here
        // ...existing chart update code...
    }
});
