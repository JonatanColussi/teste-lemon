import { ConnectionTypeEnum, ConsumerClassEnum, TariffModalityEnum } from 'src/enums';
import { eligibility } from 'src/handler';
import { formatJSONResponse } from 'src/helpers';

describe('handler', () => {
  it('should return a eligibility case and annual CO2 saving properly', async () => {
    const body = JSON.stringify({
      numeroDoDocumento: '14041737706',
      tipoDeConexao: ConnectionTypeEnum.bifasico,
      classeDeConsumo: ConsumerClassEnum.comercial,
      modalidadeTarifaria: TariffModalityEnum.convencional,
      historicoDeConsumo: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597],
    });

    const response = await eligibility(
      {
        body,
      } as any,
      {} as any,
      {} as any,
    );

    expect(response).toEqual(formatJSONResponse({ elegivel: true, economiaAnualDeCO2: 5553.24 }));
  });

  it('should return an ineligible case', async () => {
    const body = JSON.stringify({
      numeroDoDocumento: '14041737706',
      tipoDeConexao: ConnectionTypeEnum.bifasico,
      classeDeConsumo: ConsumerClassEnum.rural,
      modalidadeTarifaria: TariffModalityEnum.verde,
      historicoDeConsumo: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160],
    });

    const response = await eligibility(
      {
        body,
      } as any,
      {} as any,
      {} as any,
    );

    expect(response).toEqual(
      formatJSONResponse({
        elegivel: false,
        razoesDeInelegibilidade: [
          'Classe de consumo não aceita',
          'Modalidade tarifária não aceita',
        ],
      }),
    );
  });

  it('should return a case of insufficient consumption', async () => {
    const body = JSON.stringify({
      numeroDoDocumento: '14041737706',
      tipoDeConexao: ConnectionTypeEnum.bifasico,
      classeDeConsumo: ConsumerClassEnum.residencial,
      modalidadeTarifaria: TariffModalityEnum.convencional,
      historicoDeConsumo: [450, 380, 600, 320, 319, 400, 450, 298, 312, 219],
    });

    const response = await eligibility(
      {
        body,
      } as any,
      {} as any,
      {} as any,
    );

    expect(response).toEqual(
      formatJSONResponse({
        elegivel: false,
        razoesDeInelegibilidade: ['Consumo mínimo não aceito'],
      }),
    );
  });
});
