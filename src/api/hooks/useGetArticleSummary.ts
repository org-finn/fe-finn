import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ApiResponse, ArticleSummaryAllResponse } from '@/types';

export const getArticleSummaryPath = () => `/api/v1/article-summary/all`;

export const getArticleSummary = async () => {
  const response = await fetchInstance.get<
    ApiResponse<ArticleSummaryAllResponse>
  >(getArticleSummaryPath());
  return response.data;
};

export const useGetArticleSummary = () => {
  return useQuery({
    queryKey: ['articleSummary'],
    queryFn: getArticleSummary,
    staleTime: 1000 * 60 * 5,
  });
};
