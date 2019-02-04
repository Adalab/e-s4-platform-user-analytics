const ENDPOINT = 'http://adalab.stylesage.co/api/v1/sessions/';

const requestSessions = () => fetch(ENDPOINT).then(response => response.json());

export { requestSessions };