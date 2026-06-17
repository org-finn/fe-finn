import { useQuery } from '@tanstack/react-query';
import type { ApiResponse, KeywordsWithArticleListResponse } from '@/types';
import { fetchInstance } from '../instance';

export const getTickerKeywordsPath = (
  tickerId: string,
  date: string,
  keywordCount: number,
  articleCount: number,
  titleLength: number
) =>
  `/api/v1/prediction/ticker/${tickerId}/keywords?date=${date}&keywordCount=${keywordCount}&articleCount=${articleCount}&titleLength=${titleLength}`;

export const getTickerKeywords = async (
  tickerId: string,
  date: string,
  keywordCount: number,
  articleCount: number,
  titleLength: number
) => {
  const response = await fetchInstance.get<
    ApiResponse<KeywordsWithArticleListResponse>
  >(
    getTickerKeywordsPath(
      tickerId,
      date,
      keywordCount,
      articleCount,
      titleLength
    )
  );
  return response.data;
};

export const useGetTickerKeywords = (
  tickerId: string,
  date: string,
  keywordCount: number,
  articleCount: number,
  titleLength: number
) => {
  return useQuery({
    queryKey: [
      'tickerKeywords',
      tickerId,
      date,
      keywordCount,
      articleCount,
      titleLength,
    ],
    queryFn: () =>
      getTickerKeywords(
        tickerId,
        date,
        keywordCount,
        articleCount,
        titleLength
      ),
    staleTime: 1000 * 60 * 5,
  });
};
