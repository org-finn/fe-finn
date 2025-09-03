import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { ApiResponse, RealTimePriceData } from '@/types';

interface GetRealTimePriceParams {
  tickerId: string;
  gte?: number;
  missing?: number[];
}

export const getRealTimePricePath = (tickerId: string) =>
  `/api/v1/price/ticker/${tickerId}/real-time`;

export const getRealTimePrice = async ({
  tickerId,
  gte,
  missing,
}: GetRealTimePriceParams) => {
  const params = new URLSearchParams();

  if (gte !== undefined) {
    params.append('gte', gte.toString());
  }

  if (missing && missing.length > 0) {
    missing.forEach((value) => {
      params.append('missing', value.toString());
    });
  }

  const queryString = params.toString();
  const apiUrl = queryString
    ? `${getRealTimePricePath(tickerId)}?${queryString}`
    : getRealTimePricePath(tickerId);

  const response =
    await fetchInstance.get<ApiResponse<RealTimePriceData>>(apiUrl);
  return response.data;
};

export const useGetRealTimePrice = ({
  tickerId,
  gte,
  missing,
}: GetRealTimePriceParams) => {
  return useQuery({
    queryKey: ['real-time-price', { tickerId, gte, missing }],
    queryFn: () => getRealTimePrice({ tickerId, gte, missing }),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
};
