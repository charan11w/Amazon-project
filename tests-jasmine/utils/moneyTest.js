import {formatCurrency}  from '../../scripts/utils/money.js'

describe('test suite : formatCurrency',() => {
  it('converts cents into dollers',() => {
    expect(formatCurrency(2095)).toBe('20.95');
  });

  it('rounds to zero',() => {
    expect(formatCurrency(0)).toBe('0.00');
  });

  it('round to the nearest value',() => {
    expect(formatCurrency(2000.5)).toBe('20.01');
  });
});