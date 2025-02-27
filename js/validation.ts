export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateM0Input = (value: string): ValidationResult => {
  const num = parseFloat(value);
  if (isNaN(num)) return { isValid: false, message: 'Please enter a valid number' };
  if (num < 0) return { isValid: false, message: 'Value cannot be negative' };
  if (num > 1e12) return { isValid: false, message: 'Value too large' };
  return { isValid: true };
};

export const validateReserveRatio = (value: number): ValidationResult => {
  if (value < 1 || value > 100) {
    return { isValid: false, message: 'Reserve ratio must be between 1 and 100' };
  }
  return { isValid: true };
};

export const validateVelocity = (value: number): ValidationResult => {
  if (value <= 0 || value > 100) {
    return { isValid: false, message: 'Velocity must be between 0 and 100' };
  }
  return { isValid: true };
};
