import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePostOauthCode } from '@/api/hooks/usePostOauthCode';

export default function CallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate: postOauthCode } = usePostOauthCode();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state'); // state 응답은 요청에 지정된 redirect_uri로 전송됨
    const storedState = sessionStorage.getItem('oauthState');

    // CSRF 공격 방지를 위한 state 파라미터 검증
    if (!state || !storedState || state !== storedState) {
      console.error('OAuth state mismatch - possible CSRF attack');
      sessionStorage.removeItem('oauthState');
      navigate('/', { replace: true });
      return;
    }
    sessionStorage.removeItem('oauthState');

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
