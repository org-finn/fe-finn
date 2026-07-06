import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePostReissueToken } from '@/api/hooks/usePostReissueToken';
import { usePostLogout } from '@/api/hooks/usePostLogout';
import { AuthContext } from './AuthContext';
import { UserInfoResponse } from '@/types';
import {
  setAccessToken,
  setOnUnauthorized,
  setRefreshTokenFn,
} from '@/api/instance';

interface AuthProviderProps {
  children: React.ReactNode;
}

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
    localStorage.removeItem('nickname');
    window.location.href = '/';
  }, [logout]);

  const doRefreshToken = useCallback(async () => {
    const tokenResponse = await refreshToken({ deviceType: 'web' });
    const newToken = tokenResponse.content.accessToken;
    setAccessToken(newToken);
    return newToken;
  }, [refreshToken]);

  useEffect(() => {
    setRefreshTokenFn(doRefreshToken);
    setOnUnauthorized(handleLogout);
  }, [doRefreshToken, handleLogout]);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        const storedAuthStatus =
          localStorage.getItem('isAuthenticated') === 'true';
        if (storedAuthStatus !== isAuthenticated) {
          window.location.reload();
        }
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [isAuthenticated]);

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
          await doRefreshToken();
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
  }, [doRefreshToken, handleLogout]);

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
