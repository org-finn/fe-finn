import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePostOauthCode } from '@/api/hooks/usePostOauthCode';
import { getUserInfo } from '@/api/hooks/useGetUserInfo';
import useAuth from '@/hooks/useAuth';
import { setAccessToken } from '@/api/instance';

export default function CallbackPage() {
  const [searchParams] = useSearchParams();
  const { handleLoginSuccess } = useAuth();
  const { mutate: postOauthCode } = usePostOauthCode();
  const isOAuthProcessingRef = useRef(false);

  useEffect(() => {
    if (isOAuthProcessingRef.current) return;
    const code = searchParams.get('code');
    const state = searchParams.get('state'); // state 응답은 요청에 지정된 redirect_uri로 전송됨
    const storedState = sessionStorage.getItem('oauthState');

    // CSRF 공격 방지를 위한 state 파라미터 검증
    if (!state || state !== storedState) {
      console.error('OAuth state mismatch - possible CSRF attack');
      sessionStorage.removeItem('oauthState');
      window.location.href = '/';
      return;
    }
    sessionStorage.removeItem('oauthState');

    if (!code) {
      window.location.href = '/';
      return;
    }
    isOAuthProcessingRef.current = true;
    postOauthCode(
      {
        authorizationCode: code,
        deviceType: 'web',
      },
      {
        onSuccess: async (response) => {
          setAccessToken(response.content.accessToken);
          try {
            const userInfoResponse = await getUserInfo();
            handleLoginSuccess(userInfoResponse.content);
          } catch {
            window.location.href = '/';
            return;
          }
          if (response.content.isNewUser === true) {
            window.location.href = '/join';
            return;
          }
          const redirectPath = localStorage.getItem('redirectPath');
          if (
            redirectPath &&
            redirectPath.startsWith('/') &&
            !redirectPath.startsWith('//')
          ) {
            localStorage.removeItem('redirectPath');
            window.location.href = redirectPath;
          } else {
            window.location.href = '/';
          }
        },
        onError: (error) => {
          console.error('OAuth login failed:', error);
          window.location.href = '/';
        },
      }
    );
  }, [searchParams, postOauthCode, handleLoginSuccess]);

  return null;
}
