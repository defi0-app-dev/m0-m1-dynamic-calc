import { calculateM1 } from '../calculations';

describe('Money Supply Calculations', () => {
  describe('calculateM1', () => {
    test('calculates M1 correctly with valid inputs', () => {
      expect(calculateM1(1000, 10).value).toBe(10000);
      expect(calculateM1(500, 20).value).toBe(2500);
    });

    test('handles zero values', () => {
      expect(calculateM1(0, 10).value).toBe(0);
    });

    test('handles invalid inputs', () => {
      expect(calculateM1(NaN, 10).error).toBeDefined();
      expect(calculateM1(1000, Infinity).error).toBeDefined();
    });

    test('handles edge cases', () => {
      expect(calculateM1(1000000000, 1).value).toBe(100000000000);
      expect(calculateM1(1, 100).value).toBe(1);
    });
  });
});
