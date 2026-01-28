import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePostOauthCode } from '@/api/hooks/usePostOauthCode';

export default function CallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate: postOauthCode } = usePostOauthCode();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      navigate('/', { replace: true });
      return;
    }
    postOauthCode(
      {
        authorizationCode: code,
        deviceType: 'web',
      },
      {
        onError: (error) => {
          console.error('OAuth login failed:', error);
          navigate('/', { replace: true });
        },
      }
    );
  }, [searchParams, navigate, postOauthCode]);

  return null;
}
