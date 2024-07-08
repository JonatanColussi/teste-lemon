import type { JSONSchema } from 'json-schema-to-ts';

import { ConnectionTypeEnum, ConsumerClassEnum, TariffModalityEnum } from './enums';

const cnpj = {
  type: 'string',
  pattern: '^\\d{14}$',
} satisfies JSONSchema;

const cpf = {
  type: 'string',
  pattern: '^\\d{11}$',
} satisfies JSONSchema;

const enumOf = (array: string[]) =>
  ({
    type: 'string',
    enum: array,
  }) satisfies JSONSchema;

export default {
  type: 'object',
  additionalProperties: false,
  required: [
    'numeroDoDocumento',
    'tipoDeConexao',
    'classeDeConsumo',
    'modalidadeTarifaria',
    'historicoDeConsumo',
  ],
  properties: {
    numeroDoDocumento: { oneOf: [cpf, cnpj] },
    tipoDeConexao: enumOf([
      ConnectionTypeEnum.monofasico,
      ConnectionTypeEnum.bifasico,
      ConnectionTypeEnum.trifasico,
    ]),
    classeDeConsumo: enumOf([
      ConsumerClassEnum.comercial,
      ConsumerClassEnum.industrial,
      ConsumerClassEnum.poderPublico,
      ConsumerClassEnum.residencial,
      ConsumerClassEnum.rural,
    ]),
    modalidadeTarifaria: enumOf([
      TariffModalityEnum.azul,
      TariffModalityEnum.branca,
      TariffModalityEnum.convencional,
      TariffModalityEnum.verde,
    ]),
    historicoDeConsumo: {
      type: 'array',
      minItems: 3,
      maxItems: 12,
      items: {
        type: 'integer',
        minimum: 0,
        maximum: 9999,
      },
    },
  },
} as const satisfies JSONSchema;
