import { Calculator } from './calculator';
import { describe, beforeEach, it } from '@jest/globals';

describe('Calculator', () => {
  let calc: Calculator;

  beforeEach(() => {
    calc = new Calculator();
  });

  it('should add 1 and 1 and return 2', () => {
    const result = calc.add(1, 1);
    expect(result).toBe(2);
  });
});
