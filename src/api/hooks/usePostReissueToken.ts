import { useMutation } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { ApiResponse, ReIssueRequest, TokenResponse } from '@/types';

export const postReissueTokenPath = () => `/api/v1/reIssue`;

const postReissueToken = async ({ deviceType }: ReIssueRequest) => {
  const response = await fetchInstance.post<ApiResponse<TokenResponse>>(
    postReissueTokenPath(),
    {
      deviceType,
      // refreshToken는 앱 기능 시작할 때 추가
    },
    { withCredentials: true }
  );
  return response.data;
};

export const usePostReissueToken = () => {
  return useMutation({
    mutationFn: ({ deviceType }: ReIssueRequest) =>
      postReissueToken({ deviceType }),
  });
};
