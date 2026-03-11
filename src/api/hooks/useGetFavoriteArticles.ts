import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ApiResponse, FavoriteArticlesContent } from '@/types';

export const getFavoriteArticlesPath = () => `/api/v1/my/favorite/articles`;

export const getFavoriteArticles = async () => {
  const response = await fetchInstance.get<
    ApiResponse<FavoriteArticlesContent>
  >(getFavoriteArticlesPath());
  return response.data;
};

export const useGetFavoriteArticles = () => {
  return useQuery({
    queryKey: ['favoriteArticles'],
    queryFn: getFavoriteArticles,
    staleTime: 1000 * 60 * 5,
  });
};
