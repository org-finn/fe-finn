import { ReactElement, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

type PrivateRouteProps = {
  children: ReactElement;
};

/**
 * Renders `children` only when the user is authenticated and redirects unauthenticated access from protected paths to the root.
 *
 * @param children - React element to render when access is allowed
 * @returns The provided `children` React element when the user is authenticated, `null` otherwise.
 */
export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const directRedirectPaths = ['/join', '/auth'];
  const isProtectedPath = directRedirectPaths.includes(location.pathname);

  useEffect(() => {
    if (isProtectedPath && !isAuthenticated && !isLoading) {
      navigate('/', { replace: true });
    }
  }, [isProtectedPath, isAuthenticated, navigate, isLoading]);

  if (isAuthenticated) {
    return children;
  }

  return null;
}