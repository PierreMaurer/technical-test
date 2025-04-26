export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  api: {
    georisques: {
      baseUrl:
        process.env.GEORISQUES_API_URL ||
        'https://georisques.gouv.fr/api/v1/resultats_rapport_risque?latlon=',
    },
    addresses: {
      baseUrl:
        process.env.GEORISQUES_API_URL ||
        'https://api-adresse.data.gouv.fr/search/?q=',
    },
  },
});
