import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';

const mockTickerSearchData = [
  {
    tickerId: '0-d-q-8b-95n',
    tickerCode: 'GOOGL',
    shortCompanyName: 'Alphabet Inc.',
    fullCompanyName: 'Alphabet Inc. Class A',
  },
  {
    tickerId: '1-d-q-8b-95n',
    tickerCode: 'AAPL',
    shortCompanyName: 'Apple Inc.',
    fullCompanyName: 'Apple Inc.',
  },
  {
    tickerId: '2-d-q-8b-95n',
    tickerCode: 'META',
    shortCompanyName: 'Meta Platforms',
    fullCompanyName: 'Meta Platforms, Inc.',
  },
  {
    tickerId: '3-d-q-8b-95n',
    tickerCode: 'NFLX',
    shortCompanyName: 'Netflix',
    fullCompanyName: 'Netflix, Inc.',
  },
  {
    tickerId: '4-d-q-8b-95n',
    tickerCode: 'COIN',
    shortCompanyName: 'Coinbase',
    fullCompanyName: 'Coinbase Global, Inc.',
  },
  {
    tickerId: '5-d-q-8b-95n',
    tickerCode: 'NVDA',
    shortCompanyName: 'NVIDIA',
    fullCompanyName: 'NVIDIA Corporation',
  },
  {
    tickerId: '6-d-q-8b-95n',
    tickerCode: 'TSLA',
    shortCompanyName: 'Tesla',
    fullCompanyName: 'Tesla, Inc.',
  },
  {
    tickerId: '7-d-q-8b-95n',
    tickerCode: 'AMZN',
    shortCompanyName: 'Amazon',
    fullCompanyName: 'Amazon.com, Inc.',
  },
  {
    tickerId: '8-d-q-8b-95n',
    tickerCode: 'PYPL',
    shortCompanyName: 'PayPal',
    fullCompanyName: 'PayPal Holdings, Inc.',
  },
  {
    tickerId: '9-d-q-8b-95n',
    tickerCode: 'ZM',
    shortCompanyName: 'Zoom',
    fullCompanyName: 'Zoom Video Communications, Inc.',
  },
  {
    tickerId: '10-d-q-8b-95n',
    tickerCode: 'MSFT',
    shortCompanyName: 'Microsoft',
    fullCompanyName: 'Microsoft Corporation',
  },
  {
    tickerId: '11-d-q-8b-95n',
    tickerCode: 'AMD',
    shortCompanyName: 'AMD',
    fullCompanyName: 'Advanced Micro Devices, Inc.',
  },
  {
    tickerId: '12-d-q-8b-95n',
    tickerCode: 'INTC',
    shortCompanyName: 'Intel',
    fullCompanyName: 'Intel Corporation',
  },
  {
    tickerId: '13-d-q-8b-95n',
    tickerCode: 'SAMSUNG',
    shortCompanyName: '삼성전자',
    fullCompanyName: '삼성전자 주식회사',
  },
  {
    tickerId: '14-d-q-8b-95n',
    tickerCode: 'SK',
    shortCompanyName: 'SK하이닉스',
    fullCompanyName: 'SK하이닉스 주식회사',
  },
];

export const tickerSearchHandlers = [
  http.get(`${BASE_URL}/api/v1/search-preview/ticker`, ({ request }) => {
    const url = new URL(request.url);
    const keyword = url.searchParams.get('keyword') || '';

    if (keyword.length < 2) {
      return HttpResponse.json({
        code: '200 OK',
        message: '종목 검색 결과를 성공적으로 조회하였습니다.',
        content: {
          tickerSearchList: [],
        },
      });
    }

    const filteredResults = mockTickerSearchData.filter(
      (ticker) =>
        ticker.shortCompanyName.toLowerCase().includes(keyword.toLowerCase()) ||
        ticker.tickerCode.toLowerCase().includes(keyword.toLowerCase()) ||
        ticker.fullCompanyName.toLowerCase().includes(keyword.toLowerCase())
    );

    const results = filteredResults.slice(0, 5); // 결과 최대 5개까지 보여줌

    return HttpResponse.json({
      code: '200 OK',
      message: '종목 검색 결과를 성공적으로 조회하였습니다.',
      content: {
        tickerSearchList: results,
      },
    });
  }),
];

export const searchHandlers = [...tickerSearchHandlers];
