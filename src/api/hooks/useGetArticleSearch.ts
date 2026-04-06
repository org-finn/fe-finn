import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ApiResponse, ArticleDataResponse } from '@/types';

export const getArticleSearchPath = (keyword: string) =>
  `/api/v1/article/search?keyword=${encodeURIComponent(keyword)}`;

export const getArticleSearch = async (keyword: string) => {
  const response = await fetchInstance.get<
    ApiResponse<{ articles: ArticleDataResponse[] }>
  >(getArticleSearchPath(keyword));
  return response.data;
};

export const useGetArticleSearch = (keyword: string) => {
  return useQuery({
    queryKey: ['articleSearch', keyword],
    queryFn: () => getArticleSearch(keyword),
    enabled: keyword.length >= 2,
    staleTime: 1000 * 60 * 5,
  });
};
