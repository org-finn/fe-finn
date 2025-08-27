import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { TodayMarketStatusResponse } from '@/types';

export const getTodayMarketStatusPath = () =>
  `/api/v1/market-status/ticker/today`;

export const getTodayMarketStatus = async () => {
  const response = await fetchInstance.get<TodayMarketStatusResponse>(
    getTodayMarketStatusPath()
  );
  return response.data;
};

export const useGetTodayMarketStatus = () => {
  return useQuery({
    queryKey: ['todayMarketStatus'],
    queryFn: getTodayMarketStatus,
    staleTime: 1000 * 60 * 5,
  });
};
