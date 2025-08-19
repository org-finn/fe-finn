import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ApiResponse, StockDetailData } from '@/types';

export const GetStockDetailPath = (id: string) => `/api/stocks/${id}`;

export const GetStockDetail = async (id: string) => {
  const response = await fetchInstance.get<ApiResponse<StockDetailData>>(
    GetStockDetailPath(id)
  );
  return response.data;
};

export const useGetStockDetail = (id: string) => {
  return useQuery({
    queryKey: ['stockDetail', id],
    queryFn: () => GetStockDetail(id),
    staleTime: 1000 * 60 * 5,
  });
};
