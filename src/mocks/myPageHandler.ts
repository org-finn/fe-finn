import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getUserInfoPath } from '@/api/hooks/useGetUserInfo';
import { getFavoriteTickersPath } from '@/api/hooks/useGetFavoriteTickers';
import { putFavoriteTickerPath } from '@/api/hooks/usePutFavoriteTicker';
import { mockTickerData } from './joinHandler';

const mockFavoriteTickers = mockTickerData.slice(0, 5).map((item) => {
  const isMarketOpen = Math.random() > 0.5;
  const priceData = isMarketOpen
    ? [
        177.82, 182.55, 178.88, 180.64, 186.52, 181.36, 186.6, 190.17, 186.86,
        193.8, 193.16,
      ]
    : [
        476.99, 474, 472.12, 478.43, 487.12, 493.79, 507.49, 510.18, 503.29,
        511.14, 508.68,
      ];

  return {
    tickerId: crypto.randomUUID(),
    ...item,
    graphData: { isMarketOpen, priceData },
  };
});

export const myPageHandlers = [
  http.get(`${BASE_URL}${getUserInfoPath()}`, () => {
    return HttpResponse.json({
      code: '200',
      message: 'success',
      content: {
        nickname: '가나디',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEH9YJyZ8cIW7fXHzSw3N_PpYE6JFkcrUtKw&s',
      },
    });
  }),

  http.get(`${BASE_URL}${getFavoriteTickersPath()}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      message: '관심 종목 리스트 조회 성공',
      content: {
        tickers: mockFavoriteTickers,
      },
    });
  }),

  http.put(`${BASE_URL}${putFavoriteTickerPath()}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      message: '관심 종목 변경 성공',
      content: {},
    });
  }),
];
