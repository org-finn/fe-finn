import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getTickerListPath } from '@/api/hooks/useGetTickerList';
import { getHolidaysPath } from '@/api/hooks/useGetHolidays';

const mockTickerData = [
  {
    tickerId: '0-d-q-8b-95n',
    shortCompanyName: 'Google',
    tickerCode: 'GOOGL',
    predictionStrategy: '약한매수',
    sentiment: 1,
    newsCount: 15,
  },
  {
    tickerId: '1-d-q-8b-95n',
    shortCompanyName: 'Apple',
    tickerCode: 'AAPL',
    predictionStrategy: '중립',
    sentiment: 0,
    newsCount: 22,
  },
  {
    tickerId: '2-d-q-8b-95n',
    shortCompanyName: 'Meta',
    tickerCode: 'META',
    predictionStrategy: '약한매수',
    sentiment: 1,
    newsCount: 18,
  },
  {
    tickerId: '3-d-q-8b-95n',
    shortCompanyName: 'Netflix',
    tickerCode: 'NFLX',
    predictionStrategy: '강한매수',
    sentiment: 1,
    newsCount: 12,
  },
  {
    tickerId: '4-d-q-8b-95n',
    shortCompanyName: 'Coinbase',
    tickerCode: 'COIN',
    predictionStrategy: '약한매도',
    sentiment: -1,
    newsCount: 8,
  },
  {
    tickerId: '5-d-q-8b-95n',
    shortCompanyName: 'NVIDIA',
    tickerCode: 'NVDA',
    predictionStrategy: '강한매도',
    sentiment: -1,
    newsCount: 35,
  },
  {
    tickerId: '6-d-q-8b-95n',
    shortCompanyName: 'Tesla',
    tickerCode: 'TSLA',
    predictionStrategy: '강한매수',
    sentiment: 1,
    newsCount: 28,
  },
  {
    tickerId: '7-d-q-8b-95n',
    shortCompanyName: 'Amazon',
    tickerCode: 'AMZN',
    predictionStrategy: '중립',
    sentiment: 0,
    newsCount: 19,
  },
  {
    tickerId: '8-d-q-8b-95n',
    shortCompanyName: 'PayPal',
    tickerCode: 'PYPL',
    predictionStrategy: '약한매도',
    sentiment: -1,
    newsCount: 7,
  },
  {
    tickerId: '9-d-q-8b-95n',
    shortCompanyName: 'Zoom',
    tickerCode: 'ZM',
    predictionStrategy: '중립',
    sentiment: 0,
    newsCount: 5,
  },
];

export const tickerHandlers = [
  http.get(`${BASE_URL}${getTickerListPath()}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      message: '주식 리스트를 성공적으로 조회하였습니다.',
      content: {
        predictionDate: '2025-07-22',
        predictionList: mockTickerData,
        pageNumber: 0,
        hasNext: false,
      },
    });
  }),
];

export const holidayHandlers = [
  http.get(`${BASE_URL}${getHolidaysPath()}`, () => {
    return HttpResponse.json(true);
  }),
];

export const mainHandlers = [...tickerHandlers, ...holidayHandlers];
