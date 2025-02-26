let isDarkMode = localStorage.getItem('theme') === 'dark' || 
    (localStorage.getItem('theme') === null && 
    window.matchMedia('(prefers-color-scheme: dark)').matches);

function toggleMode() {
    isDarkMode = !isDarkMode;
    const body = document.body;
    const calculator = document.querySelector('.calculator');
    const display = document.querySelector('.display');
    
    body.classList.toggle('dark-mode');
    calculator.classList.toggle('dark-mode');
    display.classList.toggle('dark-mode');
    
    // Update button text
    const toggleButtons = document.querySelectorAll('.mode-toggle');
    toggleButtons.forEach(button => {
        button.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    });

    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Add transition class
    document.documentElement.classList.add('theme-transition');
    setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
    }, 300);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', e => {
        if (localStorage.getItem('theme') === null) {
            isDarkMode = e.matches;
            toggleMode();
        }
    });

document.addEventListener('DOMContentLoaded', () => {
    if (isDarkMode) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
});
