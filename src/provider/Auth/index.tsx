import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePostReissueToken } from '@/api/hooks/usePostReissueToken';
import { usePostLogout } from '@/api/hooks/usePostLogout';
import { AuthContext } from './AuthContext';
import { UserInfoResponse } from '@/types';
import { setAccessToken } from '@/api/instance';

interface AuthProviderProps {
  children: React.ReactNode;
}

const ACCESS_TOKEN_REFRESH_INTERVAL = 60 * 60 * 1000; // 만료 시간 1시간

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { mutateAsync: refreshToken } = usePostReissueToken();
  const { mutateAsync: logout } = usePostLogout();

  const handleLogout = useCallback(async () => {
    try {
      await logout({ deviceType: 'web' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/';
  }, [logout]);

  const refreshTokenRegularly = useCallback(async () => {
    try {
      const tokenResponse = await refreshToken({ deviceType: 'web' });
      setAccessToken(tokenResponse.content.accessToken);
    } catch (error) {
      console.error('Token refresh failed:', error);
      handleLogout();
    }
  }, [refreshToken, handleLogout]);

  const handleLoginSuccess = useCallback(
    async (userInfo: UserInfoResponse) => {
      if (!isAuthenticated) {
        localStorage.setItem('nickname', userInfo.nickname);
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
      }
    },
    [isAuthenticated]
  );

  useEffect(() => {
    const initialize = async () => {
      const savedAuthStatus =
        localStorage.getItem('isAuthenticated') === 'true';
      if (savedAuthStatus) {
        try {
          await refreshTokenRegularly();
        } catch (error) {
          console.error(
            'Failed to refresh token during initialization:',
            error
          );
          handleLogout();
        }
      }
      setIsInitialized(true);
    };

    initialize();
  }, [refreshTokenRegularly, handleLogout]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAuthenticated) {
      intervalId = setInterval(() => {
        refreshTokenRegularly();
      }, ACCESS_TOKEN_REFRESH_INTERVAL);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAuthenticated, refreshTokenRegularly]);

  const value = useMemo(
    () =>
      isInitialized
        ? {
            isAuthenticated,
            isLoading: !isInitialized,
            handleLoginSuccess,
            handleLogout,
          }
        : undefined,
    [isInitialized, isAuthenticated, handleLoginSuccess, handleLogout]
  );

  return (
    <AuthContext.Provider value={value}>
      {isInitialized && children}
    </AuthContext.Provider>
  );
}
