import { useMutation } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { NicknameRequest } from '@/types';

export const putNicknamePath = () => `/api/v1/my/nickname`;

const putNickname = async ({ nickname }: NicknameRequest) => {
  const response = await fetchInstance.put(
    putNicknamePath(),
    { nickname },
    { withCredentials: true }
  );
  return response.data;
};

export const usePutNickname = () => {
  return useMutation({
    mutationFn: (nicknameData: NicknameRequest) => putNickname(nicknameData),
  });
};
