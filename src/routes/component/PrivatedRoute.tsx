import { ReactElement, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { useGetUserInfo } from '@/api/hooks/useGetUserInfo';

type PrivateRouteProps = {
  children: ReactElement;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, isLoading, handleLoginSuccess } = useAuth();
  const { data: userInfo } = useGetUserInfo();
  const navigate = useNavigate();
  const location = useLocation();

  const directRedirectPaths = ['/join', '/callback'];
  const isProtectedPath = directRedirectPaths.includes(location.pathname);

  useEffect(() => {
    if (isProtectedPath && !isAuthenticated && !isLoading) {
      navigate('/', { replace: true });
    }
  }, [isProtectedPath, isAuthenticated, navigate, isLoading]);

  useEffect(() => {
    if (userInfo?.content.nickname && !isAuthenticated) {
      handleLoginSuccess(userInfo.content);
    }
  }, [userInfo, isAuthenticated, handleLoginSuccess]);

  if (isAuthenticated) {
    return children;
  }

  return null;
}
