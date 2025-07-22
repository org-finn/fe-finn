import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { PageableData, StockListData } from '@/types';

interface GetStockListParams {
  sort: 'popular' | 'upward' | 'downward';
  page: number;
  size: number;
}

export const getStockListPath = () => `/api/stocks`;

export const getStockList = async ({
  sort,
  page,
  size,
}: GetStockListParams) => {
  const params = new URLSearchParams({
    sort,
    page: page.toString(),
    size: size.toString(),
  });

  const response = await fetchInstance.get<PageableData<StockListData>>(
    `${getStockListPath()}?${params}`
  );
  return response.data;
};

export const useGetStockList = ({ sort, page, size }: GetStockListParams) => {
  return useQuery({
    queryKey: ['stocks', 'list', { sort, page, size }],
    queryFn: () => getStockList({ sort, page, size }),
  });
};

export const useGetPopularStocks = (size: number = 5) => {
  return useGetStockList({ sort: 'popular', page: 1, size });
};

export const useGetRisingStocks = (size: number = 5) => {
  return useGetStockList({ sort: 'upward', page: 1, size });
};

export const useGetFallingStocks = (size: number = 5) => {
  return useGetStockList({ sort: 'downward', page: 1, size });
};
