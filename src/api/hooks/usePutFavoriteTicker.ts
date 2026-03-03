import { useMutation } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

interface FavoriteTickerParams {
  tickerCode: string;
  mode: 'on' | 'off';
}

export const putFavoriteTickerPath = () => `/api/v1/my/favorite/ticker`;

export const putFavoriteTicker = ({
  tickerCode,
  mode,
}: FavoriteTickerParams) => {
  const params = new URLSearchParams({ tickerCode, mode });
  return fetchInstance.put(`${putFavoriteTickerPath()}?${params}`);
};

export const usePutFavoriteTicker = () => {
  return useMutation({
    mutationFn: ({ tickerCode, mode }: FavoriteTickerParams) =>
      putFavoriteTicker({ tickerCode, mode }),
  });
};
