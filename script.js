import { evaluate } from 'mathjs';
import { 
    calculateM1, 
    calculateMoneyMultiplier, 
    calculateVelocityImpact,
    validateInputs,
    DEFAULT_RESERVE_RATIO,
    DEFAULT_VELOCITY
} from './js/calculations.js';

let chart;
const cachedElements = {};

function cacheElements() {
    ['m0-input', 'reserve-ratio', 'multiplier-value', 'm1-value', 'ratio-value'].forEach(id => {
        cachedElements[id] = document.getElementById(id);
    });
}

function toggleMode(mode) {
    localStorage.setItem('calculatorMode', mode);
    document.getElementById('simple-mode').classList.toggle('hidden', mode !== 'simple');
    document.getElementById('expert-mode').classList.toggle('hidden', mode !== 'expert');
}

function calculateExpression(expression) {
    try {
        return evaluate(expression, {});  // Add empty scope object as second parameter
    } catch (error) {
        console.error('Invalid calculation:', error);
        return NaN;
    }
}

function updateSimpleMode() {
    let m0 = parseFloat(document.getElementById('m0').value) || 0;
    let m1 = calculateM1(m0, 10);
    document.getElementById('m1-output').textContent = m1.toFixed(2);
    updateChart(m0, m1);
}

function updateExpertMode() {
    const m0 = parseFloat(cachedElements['m0-input'].value) || 0;
    const reserveRatio = parseFloat(cachedElements['reserve-ratio'].value);
    const velocity = parseFloat(cachedElements['velocity-input'].value) || DEFAULT_VELOCITY;

    const errors = validateInputs(m0, reserveRatio, velocity);
    if (errors.length > 0) {
        showErrors(errors);
        return;
    }

    const m1 = calculateM1(m0, reserveRatio);
    const velocityImpact = calculateVelocityImpact(m1, velocity);
    const multiplier = calculateMoneyMultiplier(reserveRatio);

    updateDisplay(m1, multiplier, velocityImpact);
    updateChart(m0, m1, velocityImpact);
    showEducationalTips(reserveRatio, velocity);
}

function showErrors(errors) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger';
    alertDiv.textContent = errors.join(', ');
    document.querySelector('.results').prepend(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
}

function showEducationalTips(reserveRatio, velocity) {
    const tips = [];
    if (reserveRatio < 5) {
        tips.push('Low reserve requirements can risk bank stability but greatly increase money supply.');
    }
    if (velocity > 3) {
        tips.push('High velocity often coincides with inflationary pressure.');
    }
    
    const tipsElement = document.getElementById('educational-tips');
    tipsElement.innerHTML = tips.map(tip => `<div class="alert alert-info">${tip}</div>`).join('');
}

function updateChart(m0 = 1000, m1 = 10000) {
    const ctx = document.getElementById('moneyChart').getContext('2d');
    
    if (chart) {
        chart.data.datasets[0].data = [m0, m1];
        chart.update();
        return;
    }
    
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

document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    
    // Load saved mode
    const savedMode = localStorage.getItem('calculatorMode') || 'simple';
    toggleMode(savedMode);
    
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
        try {
            const ctx = document.getElementById('moneyChart');
            if (!ctx) {
                throw new Error('Chart canvas element not found');
            }
            
            return new Chart(ctx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['M0 (Base Money)', 'M1 (Total Money Supply)'],
                    datasets: [{
                        label: 'Money Supply Breakdown',
                        data: [0, 0],
                        backgroundColor: ['rgba(13, 110, 253, 0.6)', 'rgba(40, 167, 69, 0.6)'],
                        borderColor: ['rgb(13, 110, 253)', 'rgb(40, 167, 69)'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 750,
                        easing: 'easeInOutQuart'
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: value => `$${value.toLocaleString()}`
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: context => `$${context.parsed.y.toLocaleString()}`
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Chart initialization failed:', error);
            return null;
        }
    }

    function updateChart(chart, m0 = 0, m1 = 0) {
        // Chart update code here
        // ...existing chart update code...
    }

    function sanitizeInput(value) {
        return parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
    }

    // Update input handling
    document.getElementById('m0-input')?.addEventListener('input', (e) => {
        e.target.value = sanitizeInput(e.target.value);
    });

    // Add error boundary
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
        showErrors(['An unexpected error occurred. Please try again.']);
    });
});

function resetChart() {
    if (chart) {
        chart.destroy();
        chart = null;
    }
}
