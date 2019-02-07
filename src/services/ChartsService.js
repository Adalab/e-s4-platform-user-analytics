const ENDPOINT = 'http://adalab.stylesage.co/api/v1/charts/?from_date=2019-01-25T19:13:06.527Z&to_date=2019-02-01T19:13:06.527Z';

const requestCharts = () => fetch(ENDPOINT).then(response => response.json());

export { requestCharts };