import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import getCurrentConfig from '../config';
import { postReissueTokenPath } from '@/api/hooks/usePostReissueToken';

let accessToken: string | null = null;
let onUnauthorized: (() => void) | null = null;
let refreshTokenFn: (() => Promise<string>) | null = null;
let refreshInFlight: Promise<string> | null = null;
let isLoggingOut = false;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const setOnUnauthorized = (callback: () => void) => {
  onUnauthorized = callback;
};

export const setRefreshTokenFn = (fn: () => Promise<string>) => {
  refreshTokenFn = fn;
};

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    withCredentials: true,
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  instance.interceptors.request.use(
    (requestConfig) => {
      if (accessToken) {
        requestConfig.headers.Authorization = `Bearer ${accessToken}`;
      }
      return requestConfig;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (process.env.NODE_ENV === 'development') {
        console.error('API Error:', {
          url: originalRequest?.url,
          method: originalRequest?.method?.toUpperCase(),
          status: error.response?.status,
          message: error.message,
          data: error.response?.data,
        });
      }
      const isUnauthorized = error.response?.status === 401;
      const isReissueRequest = originalRequest?.url?.includes(
        postReissueTokenPath()
      );
      const isAlreadyRetried = originalRequest?._retry;

      if (
        isUnauthorized &&
        !isReissueRequest &&
        !isAlreadyRetried &&
        refreshTokenFn
      ) {
        originalRequest._retry = true;
        try {
          refreshInFlight ??= refreshTokenFn().finally(() => {
            refreshInFlight = null;
          });
          const newToken = await refreshInFlight;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        } catch {
          if (!isLoggingOut) {
            isLoggingOut = true;
            setAccessToken(null);
            onUnauthorized?.();
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const BASE_URL = getCurrentConfig().baseURL;
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
