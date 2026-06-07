import { useQuery } from '@tanstack/react-query';
import type { ApiResponse, KeywordsWithArticleListResponse } from '@/types';
import { fetchInstance } from '../instance';

export const getTickerKeywordsPath = (tickerId: string, date: string) =>
  `/api/v1/prediction/ticker/${tickerId}/keywords?date=${date}`;

export const getTickerKeywords = async (tickerId: string, date: string) => {
  const response = await fetchInstance.get<
    ApiResponse<KeywordsWithArticleListResponse>
  >(getTickerKeywordsPath(tickerId, date));
  return response.data;
};

export const useGetTickerKeywords = (tickerId: string, date: string) => {
  return useQuery({
    queryKey: ['tickerKeywords', tickerId, date],
    queryFn: () => getTickerKeywords(tickerId, date),
    staleTime: 1000 * 60 * 5,
  });
};
