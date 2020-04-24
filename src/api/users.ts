import restClient from './rest-client';

export const getUsers = () => restClient.get('/users');
