import { ConnectionTypeEnum, ConsumerClassEnum, TariffModalityEnum } from 'src/enums';
import {
  checkConsumerClassIsValid,
  checkMinimumConsumption,
  checkTariffModalityIsValid,
} from 'src/helpers/rules';

describe('checkConsumerClassIsValid', () => {
  it.each([
    ConsumerClassEnum.comercial,
    ConsumerClassEnum.residencial,
    ConsumerClassEnum.industrial,
  ])('should return true if the consumer class (%s) is valid', consumerClass => {
    expect(checkConsumerClassIsValid(consumerClass)).toBe(true);
  });

  it.each([ConsumerClassEnum.poderPublico, ConsumerClassEnum.rural])(
    'should return false if the consumer class (%s) is invalid',
    consumerClass => {
      expect(checkConsumerClassIsValid(consumerClass)).toBe(false);
    },
  );
});

describe('checkTariffModalityIsValid', () => {
  it.each([TariffModalityEnum.convencional, TariffModalityEnum.branca])(
    'should return true if the tariff modality (%s) is valid',
    tariffModality => {
      expect(checkTariffModalityIsValid(tariffModality)).toBe(true);
    },
  );

  it.each([TariffModalityEnum.azul, TariffModalityEnum.verde])(
    'should return false if the tariff modality (%s) is invalid',
    tariffModality => {
      expect(checkTariffModalityIsValid(tariffModality)).toBe(false);
    },
  );
});

describe('checkMinimumConsumption', () => {
  it.each([
    [ConnectionTypeEnum.monofasico, 400],
    [ConnectionTypeEnum.monofasico, 900],
    [ConnectionTypeEnum.bifasico, 500],
    [ConnectionTypeEnum.bifasico, 1000],
    [ConnectionTypeEnum.trifasico, 750],
    [ConnectionTypeEnum.trifasico, 1250],
  ])(
    'should return true if the minimum consumption on the connection type (%s) is valid',
    (connectionType, consumption) => {
      expect(checkMinimumConsumption(connectionType, consumption)).toBe(true);
    },
  );

  it.each([
    [ConnectionTypeEnum.monofasico, 350],
    [ConnectionTypeEnum.bifasico, 499],
    [ConnectionTypeEnum.trifasico, 400],
  ])(
    'should return false if the minimum consumption on the connection type (%s) is invalid',
    (connectionType, consumption) => {
      expect(checkMinimumConsumption(connectionType, consumption)).toBe(false);
    },
  );
});
