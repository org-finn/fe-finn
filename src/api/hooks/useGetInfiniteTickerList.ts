import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { PageableData, TickerListData } from '@/types';
import { getABTestVariant } from '@/utils/abTest';

interface GetTickerListParams {
  sort: string;
}

export const getInfiniteTickerListPath = () => `/api/v1/prediction/ticker`;

export const getInfiniteTickerList = async ({
  sort,
  page,
}: GetTickerListParams & { page: number }) => {
  const variant = getABTestVariant();
  const params = new URLSearchParams({
    sort,
    page: page.toString(),
    param: variant,
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
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};
