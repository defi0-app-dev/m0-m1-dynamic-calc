const THEME_KEY = 'calculator-theme';

function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);
}

function applyTheme(theme) {
    const root = document.documentElement;
    const transitioning = document.createElement('style');
    transitioning.textContent = `
        * { transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important; }
    `;
    document.head.appendChild(transitioning);
    
    root.setAttribute('data-bs-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcon(theme);
    
    setTimeout(() => {
        transitioning.remove();
    }, 300);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

function updateThemeIcon(theme) {
    const iconImg = document.querySelector('#theme-toggle img');
    if (iconImg) {
        iconImg.src = `assets/${theme === 'dark' ? 'light' : 'dark'}-theme.svg`;
    }
}

function updateChartTheme(theme) {
    if (window.chart) {
        const textColor = theme === 'dark' ? '#fff' : '#666';
        chart.options.plugins.legend.labels.color = textColor;
        chart.options.scales.x.ticks.color = textColor;
        chart.options.scales.y.ticks.color = textColor;
        chart.update();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            updateChartTheme(newTheme);
        });
    }
});
