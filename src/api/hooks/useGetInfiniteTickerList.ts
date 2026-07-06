import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { PageableData, TickerListData } from '@/types';

interface GetTickerListParams {
  sort: string;
  filter?: string;
}

export const getInfiniteTickerListPath = () => `/api/v1/prediction/ticker`;

export const getInfiniteTickerList = async ({
  sort,
  page,
  filter,
}: GetTickerListParams & { page: number }) => {
  const params = new URLSearchParams({
    sort,
    page: page.toString(),
  });
  if (filter) params.set('filter', filter);

  const response = await fetchInstance.get<PageableData<TickerListData>>(
    `${getInfiniteTickerListPath()}?${params}`
  );
  return response.data;
};

export const useGetInfiniteTickerList = ({
  sort,
  filter,
}: GetTickerListParams) => {
  return useInfiniteQuery({
    queryKey: ['tickerList', { sort, filter }],
    queryFn: ({ pageParam = 0 }) =>
      getInfiniteTickerList({ sort, page: pageParam, filter }),
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
