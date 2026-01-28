import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

/**
 * Redirects authenticated users to a stored redirect path or the application's root, and renders nothing.
 *
 * When the user becomes authenticated, reads `redirectPath` from localStorage; if present, removes the key
 * and navigates to that path with `replace: true`, otherwise navigates to `/` with `replace: true`.
 *
 * @returns A React element that renders `null` (no UI).
 */
export default function AuthPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = localStorage.getItem('redirectPath');
      if (redirectPath) {
        localStorage.removeItem('redirectPath');
        navigate(redirectPath, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, navigate]);

  return null;
}