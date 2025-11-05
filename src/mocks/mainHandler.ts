import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getInfiniteTickerListPath } from '@/api/hooks/useGetInfiniteTickerList';
import { getTodayMarketStatusPath } from '@/api/hooks/useGetTodayMarketStatus';

const mockTickerData = [
  {
    tickerId: '0-d-q-8b-95n',
    shortCompanyName: 'Google',
    tickerCode: 'GOOGL',
    predictionStrategy: '약한매수',
    sentiment: 1,
    articleCount: 15,
  },
  {
    tickerId: '1-d-q-8b-95n',
    shortCompanyName: 'Apple',
    tickerCode: 'AAPL',
    predictionStrategy: '관망',
    sentiment: 0,
    articleCount: 22,
  },
  {
    tickerId: '2-d-q-8b-95n',
    shortCompanyName: 'Meta',
    tickerCode: 'META',
    predictionStrategy: '약한매수',
    sentiment: 1,
    articleCount: 18,
  },
  {
    tickerId: '3-d-q-8b-95n',
    shortCompanyName: 'Netflix',
    tickerCode: 'NFLX',
    predictionStrategy: '강한매수',
    sentiment: 1,
    articleCount: 12,
  },
  {
    tickerId: '4-d-q-8b-95n',
    shortCompanyName: 'Coinbase',
    tickerCode: 'COIN',
    predictionStrategy: '약한매도',
    sentiment: -1,
    articleCount: 8,
  },
  {
    tickerId: '5-d-q-8b-95n',
    shortCompanyName: 'NVIDIA',
    tickerCode: 'NVDA',
    predictionStrategy: '강한매도',
    sentiment: -1,
    articleCount: 35,
  },
  {
    tickerId: '6-d-q-8b-95n',
    shortCompanyName: 'Tesla',
    tickerCode: 'TSLA',
    predictionStrategy: '강한매수',
    sentiment: 1,
    articleCount: 28,
  },
  {
    tickerId: '7-d-q-8b-95n',
    shortCompanyName: 'Amazon',
    tickerCode: 'AMZN',
    predictionStrategy: '관망',
    sentiment: 0,
    articleCount: 19,
  },
  {
    tickerId: '8-d-q-8b-95n',
    shortCompanyName: 'PayPal',
    tickerCode: 'PYPL',
    predictionStrategy: '약한매도',
    sentiment: -1,
    articleCount: 7,
  },
  {
    tickerId: '9-d-q-8b-95n',
    shortCompanyName: 'Zoom',
    tickerCode: 'ZM',
    predictionStrategy: '관망',
    sentiment: 0,
    articleCount: 5,
  },
  {
    tickerId: '0-d-q-8b-95n',
    shortCompanyName: 'Google',
    tickerCode: 'GOOGL',
    predictionStrategy: '약한매수',
    sentiment: 1,
    articleCount: 15,
  },
  {
    tickerId: '1-d-q-8b-95n',
    shortCompanyName: 'Apple',
    tickerCode: 'AAPL',
    predictionStrategy: '관망',
    sentiment: 0,
    articleCount: 22,
  },
  {
    tickerId: '2-d-q-8b-95n',
    shortCompanyName: 'Meta',
    tickerCode: 'META',
    predictionStrategy: '약한매수',
    sentiment: 1,
    articleCount: 18,
  },
  {
    tickerId: '3-d-q-8b-95n',
    shortCompanyName: 'Netflix',
    tickerCode: 'NFLX',
    predictionStrategy: '강한매수',
    sentiment: 1,
    articleCount: 12,
  },
  {
    tickerId: '4-d-q-8b-95n',
    shortCompanyName: 'Coinbase',
    tickerCode: 'COIN',
    predictionStrategy: '약한매도',
    sentiment: -1,
    articleCount: 8,
  },
];

export const tickerHandlers = [
  http.get(`${BASE_URL}${getInfiniteTickerListPath()}`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0');
    const pageSize = 10;
    const totalItems = mockTickerData.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = mockTickerData.slice(startIndex, endIndex);

    return HttpResponse.json({
      code: '200 OK',
      message: '주식 리스트를 성공적으로 조회하였습니다.',
      content: {
        predictionDate: '2025-07-22',
        predictionList: pageData,
        pageNumber: page,
        hasNext: page < totalPages - 1,
      },
    });
  }),
];

export const holidayHandlers = [
  http.get(`${BASE_URL}${getTodayMarketStatusPath()}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      message: '오늘의 마켓 상태를 성공적으로 조회하였습니다.',
      content: {
        isHoliday: false,
        tradingHours: '22:30~05:00',
        eventName: null,
      },
    });
  }),
];

export const mainHandlers = [...tickerHandlers, ...holidayHandlers];
