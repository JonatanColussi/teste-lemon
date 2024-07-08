import type { APIGatewayProxyHandler } from 'aws-lambda';

import type { ConnectionTypeEnum, ConsumerClassEnum, TariffModalityEnum } from './enums';
import {
  calculateAnnualCO2Savings,
  checkConsumerClassIsValid,
  checkMinimumConsumption,
  checkTariffModalityIsValid,
  formatJSONResponse,
  getConsumptionMedia,
} from './helpers';

export const eligibility: APIGatewayProxyHandler = async event => {
  const {
    classeDeConsumo: consumerClass,
    historicoDeConsumo: historicalConsumption,
    modalidadeTarifaria: tariffModality,
    tipoDeConexao: connectionType,
  } = JSON.parse(event.body || '') as {
    classeDeConsumo: ConsumerClassEnum;
    historicoDeConsumo: number[];
    modalidadeTarifaria: TariffModalityEnum;
    tipoDeConexao: ConnectionTypeEnum;
  };

  const reasonsForIneligibility: string[] = [];

  const consumptionMedia = getConsumptionMedia(historicalConsumption);

  if (!checkMinimumConsumption(connectionType, consumptionMedia)) {
    reasonsForIneligibility.push('Consumo mínimo não aceito');
  }

  if (!checkConsumerClassIsValid(consumerClass)) {
    reasonsForIneligibility.push('Classe de consumo não aceita');
  }

  if (!checkTariffModalityIsValid(tariffModality)) {
    reasonsForIneligibility.push('Modalidade tarifária não aceita');
  }

  const elegible = reasonsForIneligibility.length === 0;

  if (!elegible) {
    return Promise.resolve(
      formatJSONResponse({
        elegivel: false,
        razoesDeInelegibilidade: reasonsForIneligibility,
      }),
    );
  }

  return Promise.resolve(
    formatJSONResponse({
      elegivel: true,
      economiaAnualDeCO2: calculateAnnualCO2Savings(historicalConsumption),
    }),
  );
};
