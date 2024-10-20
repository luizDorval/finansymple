import axios from 'axios';

export const finansympleApi = axios.create({
  baseURL: 'http://localhost:8800',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const refresh = async () => {
  return await finansympleApi.get('/refresh');
};

export const register = async (name, email, password) => {
  return await finansympleApi.post('/auth/register', JSON.stringify({ name, email, password }));
};

export const login = async (email, password) => {
  return await finansympleApi.post('/auth/login', JSON.stringify({ email, password }));
};

export const logout = async () => {
  return await finansympleApi.get('/logout');
};
