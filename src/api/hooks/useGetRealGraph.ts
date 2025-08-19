import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { ApiResponse, GraphData } from '@/types';

export type RealGraphPeriod = '2W' | '1M' | '6M' | '1Y';

interface GetRealGraphParams {
  stockId: string;
  period?: RealGraphPeriod;
}

export const getRealGraphPath = (stockId: string) =>
  `/api/stocks/${stockId}/real-graph`;

export const getRealGraph = async ({
  stockId,
  period = '2W',
}: GetRealGraphParams) => {
  const params = new URLSearchParams({
    period,
  });

  const response = await fetchInstance.get<ApiResponse<GraphData>>(
    `${getRealGraphPath(stockId)}?${params}`
  );
  return response.data;
};

export const useGetRealGraph = ({
  stockId,
  period = '2W',
}: GetRealGraphParams) => {
  return useQuery({
    queryKey: ['stocks', stockId, 'real-graph', { period }],
    queryFn: () => getRealGraph({ stockId, period }),
    staleTime: 1000 * 60 * 5,
  });
};
