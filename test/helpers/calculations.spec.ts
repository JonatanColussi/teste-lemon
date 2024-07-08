import { calculateAnnualCO2Savings, getConsumptionMedia } from 'src/helpers/calculations';

describe('getConsumptionMedia', () => {
  it.each([
    [[3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597], 5509.166666666667],
    [[3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160], 5457.2],
  ])('should return consumption media properly', (historicalConsumption, expectedMedia) => {
    expect(getConsumptionMedia(historicalConsumption)).toBe(expectedMedia);
  });
});

describe('calculateAnnualCO2Savings', () => {
  it.each([
    [[1000], 84],
    [[3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597], 5553.24],
    [[3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160], 4584.05],
  ])('should return annual CO2 savings properly', (annualConsumption, expectedCO2Savings) => {
    expect(calculateAnnualCO2Savings(annualConsumption)).toBe(expectedCO2Savings);
  });
});
