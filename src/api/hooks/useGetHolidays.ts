import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { HolidayData } from '@/types';

export const getHolidaysPath = () => `/api/holidays`;

export const getHolidays = async () => {
  const response = await fetchInstance.get<HolidayData[]>(getHolidaysPath());
  return response.data;
};

export const useGetHolidays = () => {
  return useQuery({
    queryKey: ['holidays'],
    queryFn: getHolidays,
    staleTime: 1000 * 60 * 5,
  });
};
