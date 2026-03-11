import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ApiResponse, JoinTickerResponse } from '@/types';

export const getJoinTickerListPath = () => `/api/v1/join/tickers`;

export const getJoinTickerList = async (page: number) => {
  const response = await fetchInstance.get<ApiResponse<JoinTickerResponse>>(
    `${getJoinTickerListPath()}?page=${page}`
  );
  return response.data;
};

export const useGetJoinTickerList = (page: number) => {
  return useQuery({
    queryKey: ['joinTickerList', page],
    queryFn: () => getJoinTickerList(page),
    staleTime: 1000 * 60 * 5,
  });
};
