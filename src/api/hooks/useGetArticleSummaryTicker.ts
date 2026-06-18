import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ApiResponse, ArticleSummaryTickerResponse } from '@/types';

export const getArticleSummaryTickerPath = (id: string, date: string) =>
  `/api/v1/article-summary/${id}?date=${date}`;

export const getArticleSummaryTicker = async (id: string, date: string) => {
  const response = await fetchInstance.get<
    ApiResponse<ArticleSummaryTickerResponse>
  >(getArticleSummaryTickerPath(id, date));
  return response.data;
};

export const useGetArticleSummaryTicker = (id: string, date: string) => {
  return useQuery({
    queryKey: ['articleSummaryTicker', { id, date }],
    queryFn: () => getArticleSummaryTicker(id, date),
    staleTime: 1000 * 60 * 5,
  });
};
