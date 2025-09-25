import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { ArticleListData, PageableData } from '@/types';

interface ArticleListParams {
  filter: 'all' | 'positive' | 'negative';
  sort: 'recent';
  tickerId?: string;
}

export const getInfiniteArticleListPath = () => `/api/v1/article`;

export const getInfiniteArticleList = async ({
  filter,
  sort,
  page,
  tickerId,
}: ArticleListParams & { page: number }) => {
  const params = new URLSearchParams({
    filter,
    sort,
    page: page.toString(),
  });

  if (tickerId) {
    params.append('tickerId', tickerId);
  }

  const response = await fetchInstance.get<PageableData<ArticleListData>>(
    `${getInfiniteArticleListPath()}?${params}`
  );
  return response.data;
};

export const useGetInfiniteArticleList = ({
  filter,
  sort,
  tickerId,
}: ArticleListParams) => {
  return useInfiniteQuery({
    queryKey: ['articleList', { filter, sort, tickerId }],
    queryFn: ({ pageParam = 0 }) =>
      getInfiniteArticleList({ filter, sort, page: pageParam, tickerId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.content.hasNext) {
        return allPages.length;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
};
