import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { ApiResponse, ExchangeRateResponse } from '@/types';

export const getExchangeRatePath = () => `/api/v1/exchange-rate/real-time`;
export const getExchangeRate = async (indexCode: string) => {
  const params = new URLSearchParams({
    indexCode,
  });
  const response = await fetchInstance.get<ApiResponse<ExchangeRateResponse>>(
    `${getExchangeRatePath()}?${params}`
  );
  return response.data;
};

export const useGetExchangeRate = (indexCode: string = 'C01') => {
  return useQuery({
    queryKey: ['exchangeRate', indexCode],
    queryFn: () => getExchangeRate(indexCode),
    staleTime: 1000 * 60 * 5,
  });
};
