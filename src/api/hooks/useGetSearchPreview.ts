import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import {
  ApiResponse,
  ArticleDataResponse,
  TickerSearchPreviewResponse,
} from '@/types';

export const getSearchPreviewPath = (keyword: string) =>
  `/api/v1/search-preview?keyword=${encodeURIComponent(keyword)}`;

export const getSearchPreview = async (keyword: string) => {
  const response = await fetchInstance.get<
    ApiResponse<{
      tickerSearchList: TickerSearchPreviewResponse[];
      articleSearchList: ArticleDataResponse[];
    }>
  >(getSearchPreviewPath(keyword));
  return response.data;
};

export const useGetSearchPreview = (keyword: string) => {
  const trimmedKeyword = keyword.trim();

  return useQuery({
    queryKey: ['searchPreview', trimmedKeyword],
    queryFn: () => getSearchPreview(trimmedKeyword),
    enabled: trimmedKeyword.length >= 2, // 쿼리 활성화 조건 - 2글자부터 검색
    staleTime: 1000 * 60 * 5,
  });
};
