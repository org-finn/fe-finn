import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';
import { GetStockDetailPath } from '@/api/hooks/useGetStockDetail';

const mockNewsData = [
  {
    newsId: '1',
    headline: '안녕하세요 하상돔커피입니다.',
  },
  {
    newsId: '2',
    headline: '안녕하세요 감성돔커피입니다.',
  },
  {
    newsId: '3',
    headline: '안녕하세요 도쿄돔커피입니다.',
  },
];
const mockStockDetail = {
  predictionDate: '2025-07-22',
  stockId: 1,
  companyName: 'Aplphabet Inc.',
  stockCode: 'GOOGL',
  predictedPrice: 210.5,
  predictedChangeRate: 1.8,
  isUp: 1,
  opinion: '내일 1.8% 상승할 것으로 예상됩니다.',
  detailData: {
    date: '2025-06-08',
    open: 117.7,
    close: 118.5,
    high: 119.1,
    low: 116.3,
    volume: 1,
    news: mockNewsData,
  },
};

export const detailHandlers = [
  http.get(`${BASE_URL}${GetStockDetailPath('1')}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      message: '주식 리스트를 성공적으로 조회하였습니다.',
      content: {
        mockStockDetail,
      },
    });
  }),
];
export default detailHandlers;
