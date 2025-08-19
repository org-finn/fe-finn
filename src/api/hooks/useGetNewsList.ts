import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

import { NewsListData, PageableData } from '@/types';

interface GetNewsListParams {
  option: 'all' | 'positive' | 'negative';
  sort: 'recent';
  size: number;
}

export const getNewsListPath = () => `/api/news`;

export const getNewsList = async ({
  option,
  sort,
  size,
}: GetNewsListParams) => {
  const params = new URLSearchParams({
    option,
    sort,
    size: size.toString(),
  });

  const response = await fetchInstance.get<PageableData<NewsListData>>(
    `${getNewsListPath()}?${params}`
  );
  return response.data;
};

export const useGetNewsList = ({ option, sort, size }: GetNewsListParams) => {
  return useQuery({
    queryKey: ['news', 'list', { option, sort, size }],
    queryFn: () => getNewsList({ option, sort, size }),
    staleTime: 1000 * 60 * 5,
  });
};
