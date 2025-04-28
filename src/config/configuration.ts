import * as process from 'node:process';

export default () => ({
  port: parseInt(process.env.API_PORT, 10) || 8000,
  TYPEORM_CONNECTION: process.env.TYPEORM_CONNECTION || 'sqlite',
  TYPEORM_DATABASE: `.${process.env.TYPEORM_DATABASE}` || './data/db.sqlite',
  api: {
    georisques: {
      baseUrl:
        process.env.GEORISQUES_API_URL ||
        'https://georisques.gouv.fr/api/v1/resultats_rapport_risque?latlon=',
    },
    addresses: {
      baseUrl:
        process.env.ADDRESSES_API_URL,
    },
  },
});
