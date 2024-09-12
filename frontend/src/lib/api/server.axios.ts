import axios from 'axios';

import { categorizeError } from '@/types/error';
import { AuthSliceState } from '@/store/auth.slice';
import { getAuthFromCookie } from '../utils/auth';

export const server = axios.create({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL, withCredentials: true });

server.interceptors.request.use((config) => {
  const auth: AuthSliceState = getAuthFromCookie();
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

server.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(categorizeError(error)),
);
