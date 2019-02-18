const ENDPOINT = 'http://adalab.stylesage.co/api/v1/charts/';

const requestCharts = (startDate, endDate) => fetch(`${ENDPOINT}?from_date=${startDate}&to_date=${endDate}`).then(response => response.json());

export { requestCharts };
