import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ApiResponse, TickerSearchPreviewResponse } from '@/types';

export const getTickerSearchPath = (keyword: string) =>
  `/api/v1/search-preview/ticker?keyword=${encodeURIComponent(keyword)}`;

export const getTickerSearch = async (keyword: string) => {
  const response = await fetchInstance.get<
    ApiResponse<TickerSearchPreviewResponse[]>
  >(getTickerSearchPath(keyword));
  return response.data;
};

export const useGetTickerSearch = (keyword: string) => {
  return useQuery({
    queryKey: ['tickerSearch', keyword],
    queryFn: () => getTickerSearch(keyword),
    enabled: keyword.length >= 2, // 쿼리 활성화 조건 - 2글자부터 검색
    staleTime: 1000 * 60 * 5,
  });
};
