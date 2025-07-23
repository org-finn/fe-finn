import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';
import { GetStockDetailPath } from '@/api/hooks/useGetStockDetail';
import { getPredGraphPath } from '@/api/hooks/useGetPredGraph';

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

const mockGraphData = [
  { date: '2025-05-09', price: 102.7 },
  { date: '2025-05-10', price: 101.5 },
  { date: '2025-05-11', price: 100.9 },
  { date: '2025-05-12', price: 101.2 },
  { date: '2025-05-13', price: 103.7 },
  { date: '2025-05-14', price: 105.2 },
  { date: '2025-05-15', price: 106.7 },
  { date: '2025-05-16', price: 108.2 },
  { date: '2025-05-17', price: 107.5 },
  { date: '2025-05-18', price: 106.3 },
  { date: '2025-05-19', price: 105.1 },
  { date: '2025-05-20', price: 104.7 },
  { date: '2025-05-21', price: 103.5 },
  { date: '2025-05-22', price: 102.1 },
  { date: '2025-05-23', price: 101.9 },
  { date: '2025-05-24', price: 103.2 },
  { date: '2025-05-25', price: 104.6 },
  { date: '2025-05-26', price: 105.3 },
  { date: '2025-05-27', price: 106.8 },
  { date: '2025-05-28', price: 108.9 },
  { date: '2025-05-29', price: 109.7 },
  { date: '2025-05-30', price: 110.2 },
  { date: '2025-05-31', price: 111.4 },
  { date: '2025-06-01', price: 111.9 },
  { date: '2025-06-02', price: 112.6 },
  { date: '2025-06-03', price: 113.2 },
  { date: '2025-06-04', price: 114.7 },
  { date: '2025-06-05', price: 115.9 },
  { date: '2025-06-06', price: 116.4 },
  { date: '2025-06-07', price: 117.7 },
  { date: '2025-06-08', price: 118.5 },
  { date: '2025-06-09', price: 120.2 },
];

export const detailHandlers = [
  http.get(`${BASE_URL}${GetStockDetailPath('1')}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      message: '주식 리스트를 성공적으로 조회하였습니다.',
      content: mockStockDetail,
    });
  }),

  http.get(`${BASE_URL}${getPredGraphPath('1')}`, ({ request }) => {
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || '2W';

    return HttpResponse.json({
      code: '200 OK',
      message: '예측 그래프 데이터를 성공적으로 조회하였습니다.',
      content: {
        period,
        graphData: mockGraphData,
      },
    });
  }),
];

export default detailHandlers;
