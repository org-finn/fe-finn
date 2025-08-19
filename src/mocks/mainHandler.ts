import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getStockListPath } from '@/api/hooks/useGetStockList';
import { getHolidaysPath } from '@/api/hooks/useGetHolidays';

const mockStockData = [
  {
    stockId: '0-d-q-8b-95n',
    companyName: 'Alphabet Inc.',
    stockCode: 'GOOGL',
    predictedPrice: 210.5,
    predictedChangeRate: '1.8000%',
    isUp: 1,
  },
  {
    stockId: '1-d-q-8b-95n',
    companyName: 'Apple Inc.',
    stockCode: 'AAPL',
    predictedPrice: 185.2,
    predictedChangeRate: '-0.2800%',
    isUp: -1,
  },
  {
    stockId: '2-d-q-8b-95n',
    companyName: 'Meta Platforms, Inc.',
    stockCode: 'META',
    predictedPrice: 312.4,
    predictedChangeRate: '2.0100%',
    isUp: 1,
  },
  {
    stockId: '3-d-q-8b-95n',
    companyName: 'Netflix, Inc.',
    stockCode: 'NFLX',
    predictedPrice: 421.8,
    predictedChangeRate: '3.5000%',
    isUp: -1,
  },
  {
    stockId: '4-d-q-8b-95n',
    companyName: 'Coinbase Global, Inc.',
    stockCode: 'COIN',
    predictedPrice: 68.7,
    predictedChangeRate: '-2.3000%',
    isUp: 0,
  },
  {
    stockId: '5-d-q-8b-95n',
    companyName: 'NVIDIA Corporation',
    stockCode: 'NVDA',
    predictedPrice: 875.2,
    predictedChangeRate: '-8.2400%',
    isUp: 1,
  },
  {
    stockId: '6-d-q-8b-95n',
    companyName: 'Tesla, Inc.',
    stockCode: 'TSLA',
    predictedPrice: 245.8,
    predictedChangeRate: '4.5000%',
    isUp: 1,
  },
  {
    stockId: '7-d-q-8b-95n',
    companyName: 'Amazon.com, Inc.',
    stockCode: 'AMZN',
    predictedPrice: 178.9,
    predictedChangeRate: '0.5030%',
    isUp: 1,
  },
  {
    stockId: '8-d-q-8b-95n',
    companyName: 'PayPal Holdings, Inc.',
    stockCode: 'PYPL',
    predictedPrice: 45.2,
    predictedChangeRate: '-1.5200%',
    isUp: -1,
  },
  {
    stockId: '9-d-q-8b-95n',
    companyName: 'Zoom Video Communications',
    stockCode: 'ZM',
    predictedPrice: 62.1,
    predictedChangeRate: '0.0000%',
    isUp: -1,
  },
];

export const stockHandlers = [
  http.get(`${BASE_URL}${getStockListPath()}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      message: '주식 리스트를 성공적으로 조회하였습니다.',
      content: {
        predictionDate: '2025-07-22',
        stockList: mockStockData,
        pageNumber: 1,
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

export const mainHandlers = [...stockHandlers, ...holidayHandlers];
