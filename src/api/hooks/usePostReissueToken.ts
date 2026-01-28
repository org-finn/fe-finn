import { useMutation } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { ApiResponse, TokenResponse } from '@/types';

export const postReissueTokenPath = () => `/api/v1/reIssue`;

const postReissueToken = async (deviceType: string) => {
  const response = await fetchInstance.post<ApiResponse<TokenResponse>>(
    postReissueTokenPath(),
    {
      deviceType,
    },
    { withCredentials: true }
  );
  return response.data;
};

export const usePostReissueToken = () => {
  return useMutation({
    mutationFn: (deviceType: string) => postReissueToken(deviceType),
  });
};
