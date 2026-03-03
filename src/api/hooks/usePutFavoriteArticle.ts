import { useMutation } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

interface FavoriteArticleParams {
  articleId: string;
  mode: 'on' | 'off';
}

export const putFavoriteArticlePath = () => `/api/v1/my/favorite/article`;

export const putFavoriteArticle = ({
  articleId,
  mode,
}: FavoriteArticleParams) => {
  const params = new URLSearchParams({ articleId, mode });
  return fetchInstance.put(`${putFavoriteArticlePath()}?${params}`);
};

export const usePutFavoriteArticle = () => {
  return useMutation({
    mutationFn: ({ articleId, mode }: FavoriteArticleParams) =>
      putFavoriteArticle({ articleId, mode }),
  });
};
