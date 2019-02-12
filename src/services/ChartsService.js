//const ENDPOINT = 'http://adalab.stylesage.co/api/v1/charts/?from_date=2019-01-25T19:13:06.527Z&to_date=2019-02-01T19:13:06.527Z';
const ENDPOINT = 'http://adalab.stylesage.co/api/v1/charts/';

const requestCharts = (par1, par2) => fetch(`${ENDPOINT}?from_date=${par1}&to_date=${par2}`).then(response => response.json());

export { requestCharts };