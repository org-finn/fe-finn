import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ApiResponse, UserInfoResponse } from '@/types';

export const getUserInfoPath = () => `/api/v1/my/userinfo`;

export const getUserInfo = async () => {
  const response = await fetchInstance.get<ApiResponse<UserInfoResponse>>(
    getUserInfoPath(),
    { withCredentials: true }
  );
  return response.data;
};

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5,
  });
};
