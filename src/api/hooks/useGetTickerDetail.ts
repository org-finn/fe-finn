import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ApiResponse, TickerDetailData } from '@/types';

export const getTickerDetailPath = (id: string) =>
  `/api/v1/prediction/ticker/${id}`;

export const getTickerDetail = async (id: string) => {
  const response = await fetchInstance.get<ApiResponse<TickerDetailData>>(
    getTickerDetailPath(id)
  );
  return response.data;
};

export const useGetTickerDetail = (id: string) => {
  return useQuery({
    queryKey: ['tickerDetail', id],
    queryFn: () => getTickerDetail(id),
    staleTime: 1000 * 60 * 5,
  });
};
