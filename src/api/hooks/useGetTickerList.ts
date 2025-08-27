import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { PageableData, TickerListData } from '@/types';

interface GetTickerListParams {
  sort: 'popular' | 'upward' | 'downward';
  page: number;
}

export const getTickerListPath = () => `/api/v1/prediction/ticker`;

export const getTickerList = async ({ sort, page }: GetTickerListParams) => {
  const params = new URLSearchParams({
    sort,
    page: page.toString(),
  });

  const response = await fetchInstance.get<PageableData<TickerListData>>(
    `${getTickerListPath()}?${params}`
  );
  return response.data;
};

export const useGetTickerList = ({ sort, page }: GetTickerListParams) => {
  return useQuery({
    queryKey: ['tickerList', { sort, page }],
    queryFn: () => getTickerList({ sort, page }),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetPopularTickers = () => {
  return useGetTickerList({ sort: 'popular', page: 0 });
};

export const useGetRisingTickers = () => {
  return useGetTickerList({ sort: 'upward', page: 0 });
};

export const useGetFallingTickers = () => {
  return useGetTickerList({ sort: 'downward', page: 0 });
};
