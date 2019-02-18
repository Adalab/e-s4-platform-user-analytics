const ENDPOINT = 'http://adalab.stylesage.co/api/v1/users_by_group/';

const requestGroups = ()=> fetch(ENDPOINT).then(response => response.json());

export { requestGroups };
