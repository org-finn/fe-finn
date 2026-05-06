import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ApiResponse, TickerSearchListResponse } from '@/types';

export const getTickerSearchListPath = (keyword: string) =>
  `/api/v1/search/ticker?keyword=${encodeURIComponent(keyword)}`;

export const getTickerSearchList = async (keyword: string) => {
  const response = await fetchInstance.get<
    ApiResponse<TickerSearchListResponse>
  >(getTickerSearchListPath(keyword));
  return response.data;
};

export const useGetTickerSearchList = (keyword: string) => {
  const trimmedKeyword = keyword.trim();

  return useQuery({
    queryKey: ['tickerSearchList', trimmedKeyword],
    queryFn: () => getTickerSearchList(trimmedKeyword),
    enabled: trimmedKeyword.length >= 2,
    staleTime: 1000 * 60 * 5,
  });
};
