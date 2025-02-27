export const DEFAULT_RESERVE_RATIO = 10;
export const DEFAULT_VELOCITY = 1.5;

export function calculateMoneyMultiplier(reserveRatio) {
    return 1 / (reserveRatio / 100);
}

export function calculateM1(m0, reserveRatio) {
    const multiplier = calculateMoneyMultiplier(reserveRatio);
    return m0 * multiplier;
}

export function calculateVelocityImpact(m1, velocity) {
    return m1 * velocity;
}

export function validateInputs(m0, reserveRatio, velocity) {
    const errors = [];
    if (m0 <= 0) errors.push('M0 must be positive');
    if (reserveRatio <= 0 || reserveRatio > 100) errors.push('Reserve ratio must be between 0 and 100');
    if (velocity <= 0) errors.push('Velocity must be positive');
    return errors;
}
