import { fetchInstance } from '@/api/instance';
import { ApiResponse, ArticleTickerListData } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const getFilterTickerListPath = () => `/api/v1/article/ticker-list`;
export const getFilterTickerList = async () => {
  const response = await fetchInstance.get<ApiResponse<ArticleTickerListData>>(
    getFilterTickerListPath()
  );
  return response.data;
};

export const useGetFilterTickerList = () => {
  return useQuery({
    queryKey: ['filterTickerList'],
    queryFn: getFilterTickerList,
    staleTime: 1000 * 60 * 60,
  });
};
