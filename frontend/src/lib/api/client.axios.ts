import axios from 'axios';

export const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL, withCredentials: true });

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
