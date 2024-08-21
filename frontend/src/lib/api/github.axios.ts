import axios from 'axios';

import { categorizeError } from '@/types/error';

export const github = axios.create({ baseURL: 'https://api.github.com' });

github.interceptors.response.use(
  (response) => response,
  (error) => {
    throw categorizeError(error);
  },
);
