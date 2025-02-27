export const sanitizeInput = (value: string): string => {
  return value.replace(/[^\d.-]/g, '');
};

export const validateNumericInput = (value: string, min: number, max: number): boolean => {
  const num = parseFloat(sanitizeInput(value));
  return !isNaN(num) && isFinite(num) && num >= min && num <= max;
};
