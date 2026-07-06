import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { ArticleListData, PageableData } from '@/types';

interface ArticleListParams {
  sentiment?: 'positive' | 'negative';
  sort: 'recent';
  tickerCode?: string[];
  filter?: string;
}

export const getInfiniteArticleListPath = () => `/api/v1/article`;

export const getInfiniteArticleList = async ({
  sentiment,
  sort,
  page,
  tickerCode,
  filter,
}: ArticleListParams & { page: number }) => {
  const params = new URLSearchParams({
    sort,
    page: page.toString(),
  });

  if (tickerCode && tickerCode.length > 0) {
    tickerCode.forEach((code) => {
      params.append('tickerCode', code);
    });
  }

  if (sentiment) {
    params.append('sentiment', sentiment);
  }

  if (filter) params.set('filter', filter);

  const response = await fetchInstance.get<PageableData<ArticleListData>>(
    `${getInfiniteArticleListPath()}?${params}`
  );
  return response.data;
};

export const useGetInfiniteArticleList = ({
  sentiment,
  sort,
  tickerCode,
  filter,
}: ArticleListParams) => {
  return useInfiniteQuery({
    queryKey: [
      'articleList',
      tickerCode || [],
      sentiment || null,
      sort,
      filter,
    ],
    queryFn: ({ pageParam = 0 }) =>
      getInfiniteArticleList({
        sentiment,
        sort,
        page: pageParam,
        tickerCode,
        filter,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.content.hasNext) {
        return allPages.length;
      }
      return undefined;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};
