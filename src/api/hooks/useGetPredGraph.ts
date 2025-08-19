import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { ApiResponse, GraphData } from '@/types';

export type PredGraphPeriod = '2W' | '1M' | '6M' | '1Y';

interface GetPredGraphParams {
  stockId: string;
  period?: PredGraphPeriod;
}

export const getPredGraphPath = (stockId: string) =>
  `/api/stocks/${stockId}/pred-graph`;

export const getPredGraph = async ({
  stockId,
  period = '2W',
}: GetPredGraphParams) => {
  const params = new URLSearchParams({
    period,
  });

  const response = await fetchInstance.get<ApiResponse<GraphData>>(
    `${getPredGraphPath(stockId)}?${params}`
  );
  return response.data;
};

export const useGetPredGraph = ({
  stockId,
  period = '2W',
}: GetPredGraphParams) => {
  return useQuery({
    queryKey: ['stocks', stockId, 'pred-graph', { period }],
    queryFn: () => getPredGraph({ stockId, period }),
    staleTime: 1000 * 60 * 5,
  });
};
