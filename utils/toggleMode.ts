type CalculatorMode = 'simple' | 'expert';

export const toggleMode = (mode: CalculatorMode): void => {
  // Store the mode preference
  localStorage.setItem('calculatorMode', mode);
  
  // Dispatch custom event for mode change
  window.dispatchEvent(new CustomEvent('calculatorModeChange', { detail: mode }));
};
