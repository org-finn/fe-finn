import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { ArticleListData, PageableData } from '@/types';

interface ArticleListParams {
  filter: 'all' | 'positive' | 'negative';
  sort: 'recent';
  page: number;
}

export const getArticleListPath = () => `/api/v1/article`;

export const getArticleList = async ({
  filter,
  sort,
  page,
}: ArticleListParams) => {
  const params = new URLSearchParams({
    filter,
    sort,
    page: page.toString(),
  });

  const response = await fetchInstance.get<PageableData<ArticleListData>>(
    `${getArticleListPath()}?${params}`
  );
  return response.data;
};

export const useGetArticleList = ({
  filter,
  sort,
  page,
}: ArticleListParams) => {
  return useQuery({
    queryKey: ['articleList', { filter, sort, page }],
    queryFn: () => getArticleList({ filter, sort, page }),
    staleTime: 1000 * 60 * 5,
  });
};
