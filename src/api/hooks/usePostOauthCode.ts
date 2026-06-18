import { useMutation } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { ApiResponse, OAuthLoginRequest, TokenResponse } from '@/types';

export const postOauthCodePath = () => `/api/v1/login/google`;

const postOauthCode = async ({
  authorizationCode,
  deviceType,
}: OAuthLoginRequest) => {
  const response = await fetchInstance.post<ApiResponse<TokenResponse>>(
    postOauthCodePath(),
    {
      authorizationCode,
      deviceType,
    }
  );
  return response.data;
};

export const usePostOauthCode = () => {
  return useMutation({
    mutationFn: ({ authorizationCode, deviceType }: OAuthLoginRequest) =>
      postOauthCode({ authorizationCode, deviceType }),
  });
};
