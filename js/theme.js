let isDarkMode = false;

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
}
