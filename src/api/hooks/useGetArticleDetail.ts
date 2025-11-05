import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ApiResponse, ArticleDetailResponse } from '@/types';

export const getArticleDetailPath = (id: string) => `/api/v1/article/${id}`;

export const getArticleDetail = async (id: string) => {
  const response = await fetchInstance.get<ApiResponse<ArticleDetailResponse>>(
    getArticleDetailPath(id)
  );
  return response.data;
};

export const useGetArticleDetail = (id: string) => {
  return useQuery({
    queryKey: ['articleDetail', id],
    queryFn: () => getArticleDetail(id),
    staleTime: 1000 * 60 * 5,
  });
};
