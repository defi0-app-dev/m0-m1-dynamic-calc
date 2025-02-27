import { sanitizeInput, validateNumericInput } from '../validation';

describe('Validation Utils', () => {
  describe('sanitizeInput', () => {
    test('removes non-numeric characters', () => {
      expect(sanitizeInput('123abc')).toBe('123');
      expect(sanitizeInput('12.34')).toBe('12.34');
      expect(sanitizeInput('-123')).toBe('-123');
    });

    test('handles empty input', () => {
      expect(sanitizeInput('')).toBe('');
    });
  });

  describe('validateNumericInput', () => {
    test('validates numbers within range', () => {
      expect(validateNumericInput('100', 0, 1000)).toBe(true);
      expect(validateNumericInput('-50', -100, 100)).toBe(true);
    });

    test('rejects out of range numbers', () => {
      expect(validateNumericInput('2000', 0, 1000)).toBe(false);
      expect(validateNumericInput('-200', -100, 100)).toBe(false);
    });

    test('rejects invalid input', () => {
      expect(validateNumericInput('abc', 0, 100)).toBe(false);
      expect(validateNumericInput('', 0, 100)).toBe(false);
    });
  });
});
