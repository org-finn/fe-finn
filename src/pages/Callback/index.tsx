import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { usePostOauthCode } from '@/api/hooks/usePostOauthCode';
import { getUserInfo } from '@/api/hooks/useGetUserInfo';
import useAuth from '@/hooks/useAuth';
import { setAccessToken } from '@/api/instance';

export default function CallbackPage() {
  const [searchParams] = useSearchParams();
  const { handleLoginSuccess } = useAuth();
  const { mutate: postOauthCode } = usePostOauthCode();
  const queryClient = useQueryClient();
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
      window.location.replace('/');
      return;
    }
    sessionStorage.removeItem('oauthState');

    if (!code) {
      window.location.replace('/');
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
            queryClient.setQueryData(['userInfo'], userInfoResponse);
            handleLoginSuccess(userInfoResponse.content);
          } catch {
            window.location.replace('/');
            return;
          }
          if (response.content.isNewUser === true) {
            window.location.replace('/join');
            return;
          }
          const redirectPath = localStorage.getItem('redirectPath');
          if (
            redirectPath &&
            redirectPath.startsWith('/') &&
            !redirectPath.startsWith('//')
          ) {
            localStorage.removeItem('redirectPath');
            window.location.replace(redirectPath);
          } else {
            window.location.replace('/');
          }
        },
        onError: (error) => {
          console.error('OAuth login failed:', error);
          window.location.replace('/');
        },
      }
    );
  }, [searchParams, postOauthCode, handleLoginSuccess, queryClient]);

  return null;
}
