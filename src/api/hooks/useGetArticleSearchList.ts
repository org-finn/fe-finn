import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ApiResponse, ArticleSearchListResponse } from '@/types';

export const getArticleSearchListPath = (keyword: string) =>
  `/api/v1/search/article?keyword=${encodeURIComponent(keyword)}`;

export const getArticleSearchList = async (keyword: string) => {
  const response = await fetchInstance.get<
    ApiResponse<ArticleSearchListResponse>
  >(getArticleSearchListPath(keyword));
  return response.data;
};

export const useGetArticleSearchList = (keyword: string) => {
  const trimmedKeyword = keyword.trim();

  return useQuery({
    queryKey: ['articleSearchList', trimmedKeyword],
    queryFn: () => getArticleSearchList(trimmedKeyword),
    enabled: trimmedKeyword.length >= 2,
    staleTime: 1000 * 60 * 5,
  });
};
