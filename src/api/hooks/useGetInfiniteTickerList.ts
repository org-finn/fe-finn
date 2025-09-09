import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { PageableData, TickerListData } from '@/types';

interface GetTickerListParams {
  sort: 'popular' | 'upward' | 'downward';
}

export const getInfiniteTickerListPath = () => `/api/v1/prediction/ticker`;

export const getInfiniteTickerList = async ({
  sort,
  page,
}: GetTickerListParams & { page: number }) => {
  const params = new URLSearchParams({
    sort,
    page: page.toString(),
  });

  const response = await fetchInstance.get<PageableData<TickerListData>>(
    `${getInfiniteTickerListPath()}?${params}`
  );
  return response.data;
};

export const useGetInfiniteTickerList = ({ sort }: GetTickerListParams) => {
  return useInfiniteQuery({
    queryKey: ['tickerList', { sort }],
    queryFn: ({ pageParam = 0 }) =>
      getInfiniteTickerList({ sort, page: pageParam }),
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

export const useGetPopularTickers = () => {
  return useGetInfiniteTickerList({ sort: 'popular' });
};

export const useGetRisingTickers = () => {
  return useGetInfiniteTickerList({ sort: 'upward' });
};

export const useGetFallingTickers = () => {
  return useGetInfiniteTickerList({ sort: 'downward' });
};
