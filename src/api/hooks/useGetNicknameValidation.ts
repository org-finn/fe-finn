import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { ApiResponse, NicknameValidationResponse } from '@/types';

export const getNicknameValidationPath = (nickname: string) =>
  `/api/v1/my/nickname/validation?nickname=${encodeURIComponent(nickname)}`;

export const getNicknameValidation = async (nickname: string) => {
  const response = await fetchInstance.get<
    ApiResponse<NicknameValidationResponse>
  >(getNicknameValidationPath(nickname));
  return response.data;
};

export const useGetNicknameValidation = (nickname: string) => {
  return useQuery({
    queryKey: ['nicknameValidation', nickname],
    queryFn: () => getNicknameValidation(nickname),
    enabled: !!nickname,
  });
};
