import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

/**
 * Redirects authenticated users to a saved redirect path or to the root and renders no UI.
 *
 * When the authentication state becomes true, this component reads `redirectPath` from
 * `localStorage`. If present, it removes the key and navigates to that path (replacing history);
 * otherwise it navigates to `/` (replacing history).
 *
 * @returns `null` — this component renders no UI
 */
export default function JoinPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // to-do: 추후 초기 설정 컴포넌트 추가해야 됨
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