import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePostOauthCode } from '@/api/hooks/usePostOauthCode';

/**
 * Handles the OAuth redirect by extracting the `code` query parameter and exchanging it for an auth token.
 *
 * If the `code` query parameter is missing, navigates to the root path. If present, posts the authorization code
 * to the backend with `deviceType` set to `'web'`; on error it logs the failure and navigates to the root path.
 *
 * @returns `null` — this page renders nothing.
 */
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