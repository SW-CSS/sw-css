import axios from 'axios';

import { categorizeError } from '@/types/error';

export const server = axios.create({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL, withCredentials: true });

server.interceptors.response.use(
  (response) => response,
  (error) => {
    Promise.reject(categorizeError(error));
  },
);
