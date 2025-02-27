import { calculateM1, calculateMoneyMultiplier, calculateVelocityImpact } from './calculations';

describe('Money Supply Calculations', () => {
  test('calculateM1 returns correct value', () => {
    expect(calculateM1(1000, 10)).toEqual({ value: 10000 });
    expect(calculateM1(500, 20)).toEqual({ value: 2500 });
  });

  test('calculateMoneyMultiplier returns correct multiplier', () => {
    expect(calculateMoneyMultiplier(10)).toBe(10);
    expect(calculateMoneyMultiplier(20)).toBe(5);
  });

  test('calculateVelocityImpact returns correct impact', () => {
    expect(calculateVelocityImpact(1000, 2)).toBe(2000);
    expect(calculateVelocityImpact(500, 1.5)).toBe(750);
  });
});
