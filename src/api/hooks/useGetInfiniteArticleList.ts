import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { ArticleListData, PageableData } from '@/types';

interface ArticleListParams {
  filter: 'all' | 'positive' | 'negative';
  sort: 'recent';
  tickerCode?: string[];
}

export const getInfiniteArticleListPath = () => `/api/v1/article`;

export const getInfiniteArticleList = async ({
  filter,
  sort,
  page,
  tickerCode,
}: ArticleListParams & { page: number }) => {
  const params = new URLSearchParams({
    filter,
    sort,
    page: page.toString(),
  });

  if (tickerCode && tickerCode.length > 0) {
    tickerCode.forEach((code) => {
      params.append('tickerCode', code);
    });
  }

  const response = await fetchInstance.get<PageableData<ArticleListData>>(
    `${getInfiniteArticleListPath()}?${params}`
  );
  return response.data;
};

export const useGetInfiniteArticleList = ({
  filter,
  sort,
  tickerCode,
}: ArticleListParams) => {
  return useInfiniteQuery({
    queryKey: ['articleList'],
    queryFn: ({ pageParam = 0 }) =>
      getInfiniteArticleList({ filter, sort, page: pageParam, tickerCode }),
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
