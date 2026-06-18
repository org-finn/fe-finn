import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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
}: GetRealGraphParams): Promise<ApiResponse<GraphData> | null> => {
  const params = new URLSearchParams({
    period,
  });

  try {
    const response = await fetchInstance.get<ApiResponse<GraphData>>(
      `${getRealGraphPath(tickerId)}?${params}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
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
