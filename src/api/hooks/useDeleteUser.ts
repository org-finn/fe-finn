import { useMutation } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

export const deleteUserPath = () => '/api/v1/my/withdrawn';

export const deleteUser = async () => {
  await fetchInstance.delete(deleteUserPath());
  return null;
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: () => deleteUser(),
  });
};
