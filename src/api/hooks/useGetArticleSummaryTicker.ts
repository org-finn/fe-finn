import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ApiResponse, ArticleSummaryTickerResponse } from '@/types';

export const getArticleSummaryTickerPath = (id: string) =>
  `/api/v1/article-summary/${id}`;

export const getArticleSummaryTicker = async (id: string) => {
  const response = await fetchInstance.get<
    ApiResponse<ArticleSummaryTickerResponse>
  >(getArticleSummaryTickerPath(id));
  return response.data;
};

export const useGetArticleSummaryTicker = (id: string) => {
  return useQuery({
    queryKey: ['articleSummaryTicker', { id }],
    queryFn: () => getArticleSummaryTicker(id),
    staleTime: 1000 * 60 * 5,
  });
};
