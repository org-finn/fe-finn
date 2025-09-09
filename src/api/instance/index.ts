import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export const BASE_URL = 'https://dsvt1su3.articker.kr';

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('API Error:', {
          url: error.config?.url,
          method: error.config?.method?.toUpperCase(),
          status: error.response?.status,
          message: error.message,
          data: error.response?.data,
        });
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const fetchInstance = initInstance({
  baseURL: BASE_URL,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 5,
    },
  },
});
