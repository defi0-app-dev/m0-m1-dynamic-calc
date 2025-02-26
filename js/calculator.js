let history = [];
const maxHistoryItems = 10;

function handleKeyPress(event) {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}

function appendNumber(number) {
    const display = document.querySelector('.display');
    if (display.value === '0') {
        display.value = number;
    } else {
        display.value += number;
    }
}

function calculate() {
    const display = document.querySelector('.display');
    try {
        const result = eval(display.value);
        if (!isFinite(result)) {
            throw new Error('Invalid calculation');
        }
        addToHistory(display.value, result);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => display.value = '0', 2000);
    }
}

function addToHistory(expression, result) {
    history.unshift({ expression, result });
    if (history.length > maxHistoryItems) {
        history.pop();
    }
    updateHistoryPanel();
}

function updateHistoryPanel() {
    const historyPanel = document.querySelector('.history-panel');
    historyPanel.innerHTML = history
        .map(item => `
            <div class="history-item" onclick="useHistoryItem('${item.result}')">
                ${item.expression} = ${item.result}
            </div>
        `).join('');
}

function useHistoryItem(value) {
    document.querySelector('.display').value = value;
}

// Add event listeners
document.addEventListener('keydown', handleKeyPress);
