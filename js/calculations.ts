export const DEFAULT_RESERVE_RATIO = 10;
export const DEFAULT_VELOCITY = 1.5;

interface CalculationResult {
  value: number;
  error?: string;
}

export const calculateMoneyMultiplier = (reserveRatio: number): number => {
  return 1 / (reserveRatio / 100);
};

export const calculateM1 = (m0: number, reserveRatio: number): CalculationResult => {
  try {
    if (!isFinite(m0) || !isFinite(reserveRatio)) {
      throw new Error('Invalid input values');
    }
    const multiplier = calculateMoneyMultiplier(reserveRatio);
    return { value: m0 * multiplier };
  } catch (error) {
    return { value: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const calculateVelocityImpact = (m1: number, velocity: number): number => {
  return m1 * velocity;
};

export const validateInputs = (m0: number, reserveRatio: number, velocity: number): string[] => {
  const errors: string[] = [];
  if (m0 <= 0) errors.push('M0 must be positive');
  if (reserveRatio <= 0 || reserveRatio > 100) errors.push('Reserve ratio must be between 0 and 100');
  if (velocity <= 0) errors.push('Velocity must be positive');
  return errors;
};
