import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ApiResponse, FavoriteTickersContent } from '@/types';

export const getFavoriteTickersPath = () => `/api/v1/my/favorite/tickers`;

export const getFavoriteTickers = async () => {
  const response = await fetchInstance.get<ApiResponse<FavoriteTickersContent>>(
    getFavoriteTickersPath()
  );
  return response.data;
};

export const useGetFavoriteTickers = () => {
  return useQuery({
    queryKey: ['favoriteTickers'],
    queryFn: getFavoriteTickers,
    staleTime: 1000 * 60 * 5,
  });
};
