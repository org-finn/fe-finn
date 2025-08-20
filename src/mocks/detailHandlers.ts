import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getTickerDetailPath } from '@/api/hooks/useGetTickerDetail';
import { getPredGraphPath } from '@/api/hooks/useGetPredGraph';
import { getRealGraphPath } from '@/api/hooks/useGetRealGraph';

const mockNewsData = [
  {
    articleId: '1',
    headline: '구글, AI 기술 발전으로 검색 시장 점유율 확대 전망',
    sentiment: 'positive',
    reasoning: 'AI 기술 개발로 인한 경쟁력 강화 및 시장 점유율 확대 가능성',
  },
  {
    articleId: '2',
    headline: '알파벳, 클라우드 사업 성장세 지속... 아마존과 경쟁 심화',
    sentiment: 'positive',
    reasoning: '클라우드 사업의 지속적인 성장으로 수익성 개선 기대',
  },
  {
    articleId: '3',
    headline: '구글 광고 수익 감소 우려, 경제 불황 영향으로 광고비 삭감',
    sentiment: 'negative',
    reasoning: '경제 불황으로 인한 광고 수익 감소가 전체 실적에 부정적 영향',
  },
];

const mockTickerDetail = {
  predictionDate: '2025-07-22',
  tickerId: '0-d-q-8b-95n',
  shortCompanyName: 'Alphabet Inc.',
  tickerCode: 'GOOGL',
  predictionStrategy: '강한 매수',
  sentiment: 1,
  articleCount: 15,
  sentimentScore: 85,
  detailData: {
    priceDate: '2025-06-08',
    open: 117.7,
    close: 118.5,
    high: 119.1,
    low: 116.3,
    volume: 1,
    news: mockNewsData,
  },
};

const mockPredGraphData = [
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

const mockRealGraphData = [
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
  { date: '2025-05-24', price: 104.2 },
  { date: '2025-05-25', price: 104.6 },
  { date: '2025-05-26', price: 107.3 },
  { date: '2025-05-27', price: 106.8 },
  { date: '2025-05-28', price: 108.9 },
  { date: '2025-05-29', price: 109.7 },
  { date: '2025-05-30', price: 110.2 },
  { date: '2025-05-31', price: 101.4 },
  { date: '2025-06-01', price: 111.9 },
  { date: '2025-06-02', price: 112.6 },
  { date: '2025-06-03', price: 113.2 },
  { date: '2025-06-04', price: 124.7 },
  { date: '2025-06-05', price: 115.9 },
  { date: '2025-06-06', price: 116.4 },
  { date: '2025-06-07', price: 117.7 },
  { date: '2025-06-08', price: 118.5 },
];

export const detailHandlers = [
  http.get(`${BASE_URL}${getTickerDetailPath('0-d-q-8b-95n')}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      message: '종목 예측 상세 정보를 성공적으로 조회하였습니다.',
      content: mockTickerDetail,
    });
  }),

  http.get(`${BASE_URL}${getPredGraphPath('0-d-q-8b-95n')}`, ({ request }) => {
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || '2W';

    return HttpResponse.json({
      code: '200 OK',
      message: '예측 그래프 데이터를 성공적으로 조회하였습니다.',
      content: {
        period,
        graphData: mockPredGraphData,
      },
    });
  }),
  http.get(`${BASE_URL}${getRealGraphPath('0-d-q-8b-95n')}`, ({ request }) => {
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || '2W';

    return HttpResponse.json({
      code: '200 OK',
      message: '실제 그래프 데이터를 성공적으로 조회하였습니다.',
      content: {
        period,
        graphData: mockRealGraphData,
      },
    });
  }),
];

export default detailHandlers;
