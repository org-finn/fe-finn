import { useMutation } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { ApiEmptyResponse, LogoutRequest } from '@/types';

export const postLogoutPath = () => `/api/v1/logout`;

const postLogout = async ({ deviceType }: LogoutRequest) => {
  const response = await fetchInstance.post<ApiEmptyResponse>(
    postLogoutPath(),
    {
      deviceType,
      // refreshToken는 앱 기능 시작할 때 추가
    }
  );
  return response.data;
};

export const usePostLogout = () => {
  return useMutation({
    mutationFn: ({ deviceType }: LogoutRequest) => postLogout({ deviceType }),
  });
};
