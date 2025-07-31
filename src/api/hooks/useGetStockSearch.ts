import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ApiResponse, StockSearchResponse } from '@/types';

export const getStockSearchPath = (keyword: string) =>
  `/api/search/complete?keyword=${encodeURIComponent(keyword)}`;

export const getStockSearch = async (keyword: string) => {
  const response = await fetchInstance.get<ApiResponse<StockSearchResponse[]>>(
    getStockSearchPath(keyword)
  );
  return response.data;
};

export const useGetStockSearch = (keyword: string) => {
  return useQuery({
    queryKey: ['stockSearch', keyword],
    queryFn: () => getStockSearch(keyword),
    enabled: keyword.length >= 2, // 쿼리 활성화 조건 - 2글자부터 검색
    staleTime: 1000 * 60 * 5,
  });
};
