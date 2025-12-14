import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { ApiResponse, GraphData } from '@/types';

export type RealGraphPeriod = '2W' | '1M' | '6M' | '1Y';

interface GetRealGraphParams {
  tickerId: string;
  period?: RealGraphPeriod;
}

export const getRealGraphPath = (tickerId: string) =>
  `/api/v1/price/ticker/${tickerId}/graph`;

export const getRealGraph = async ({
  tickerId,
  period = '2W',
}: GetRealGraphParams) => {
  const params = new URLSearchParams({
    period,
  });

  const response = await fetchInstance.get<ApiResponse<GraphData>>(
    `${getRealGraphPath(tickerId)}?${params}`
  );
  return response.data;
};

export const useGetRealGraph = ({
  tickerId,
  period = '2W',
}: GetRealGraphParams) => {
  return useQuery({
    queryKey: ['real-graph', { tickerId, period }],
    queryFn: () => getRealGraph({ tickerId, period }),
    staleTime: 1000 * 60 * 5,
  });
};
