import API from './api';

export const register = (payload) => API.post('/auth/register', payload);
export const login = (payload) => API.post('/auth/login', payload);
export const profile = () => API.get('/auth/profile');
