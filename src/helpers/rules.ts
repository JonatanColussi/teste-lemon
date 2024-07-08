import { ConnectionTypeEnum, ConsumerClassEnum, TariffModalityEnum } from '../enums';

export function checkConsumerClassIsValid(consumerClass: ConsumerClassEnum) {
  return [
    ConsumerClassEnum.comercial,
    ConsumerClassEnum.residencial,
    ConsumerClassEnum.industrial,
  ].includes(consumerClass);
}

export function checkMinimumConsumption(connectionType: ConnectionTypeEnum, consumption: number) {
  const minimumConsumption: Record<ConnectionTypeEnum, number> = {
    [ConnectionTypeEnum.monofasico]: 400,
    [ConnectionTypeEnum.bifasico]: 500,
    [ConnectionTypeEnum.trifasico]: 750,
  };

  return consumption >= minimumConsumption[connectionType];
}

export function checkTariffModalityIsValid(tariffModality: TariffModalityEnum) {
  return [TariffModalityEnum.convencional, TariffModalityEnum.branca].includes(tariffModality);
}
