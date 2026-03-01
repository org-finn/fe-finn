import { useMutation } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { FavoriteTickersRequest } from '@/types';

export const putFavoriteTickersPath = () => `/api/v1/my/favorite/tickers`;

const putFavoriteTickers = async ({ tickers }: FavoriteTickersRequest) => {
  const response = await fetchInstance.put(putFavoriteTickersPath(), {
    tickers,
  });
  return response.data;
};

export const usePutFavoriteTickers = () => {
  return useMutation({
    mutationFn: (favoriteTickersData: FavoriteTickersRequest) =>
      putFavoriteTickers(favoriteTickersData),
  });
};
