export function calculateAnnualCO2Savings(historicalConsumption: number[]) {
  const CO2_EMISSIONS_PER_1000_KWH = 84;
  const CO2_EMISSIONS_PER_KWH = CO2_EMISSIONS_PER_1000_KWH / 1000;

  const annualConsumption = arraySum(historicalConsumption);

  return Number.parseFloat((annualConsumption * CO2_EMISSIONS_PER_KWH).toFixed(2));
}

function arraySum(values: number[]) {
  return values.reduce((acc, value) => acc + value, 0);
}

export function getConsumptionMedia(historicalConsumption: number[]) {
  const consumptionSum = arraySum(historicalConsumption);

  return consumptionSum / historicalConsumption.length;
}
