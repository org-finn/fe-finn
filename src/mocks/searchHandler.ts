import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';

const mockStockSearchData = [
  {
    stockId: '0-d-q-8b-95n',
    stockCode: 'GOOGL',
    companyName: 'Alphabet Inc.',
    fullCompanyName: 'Alphabet Inc. Class A',
  },
  {
    stockId: '1-d-q-8b-95n',
    stockCode: 'AAPL',
    companyName: 'Apple Inc.',
    fullCompanyName: 'Apple Inc.',
  },
  {
    stockId: '2-d-q-8b-95n',
    stockCode: 'META',
    companyName: 'Meta Platforms',
    fullCompanyName: 'Meta Platforms, Inc.',
  },
  {
    stockId: '3-d-q-8b-95n',
    stockCode: 'NFLX',
    companyName: 'Netflix',
    fullCompanyName: 'Netflix, Inc.',
  },
  {
    stockId: '4-d-q-8b-95n',
    stockCode: 'COIN',
    companyName: 'Coinbase',
    fullCompanyName: 'Coinbase Global, Inc.',
  },
  {
    stockId: '5-d-q-8b-95n',
    stockCode: 'NVDA',
    companyName: 'NVIDIA',
    fullCompanyName: 'NVIDIA Corporation',
  },
  {
    stockId: '6-d-q-8b-95n',
    stockCode: 'TSLA',
    companyName: 'Tesla',
    fullCompanyName: 'Tesla, Inc.',
  },
  {
    stockId: '7-d-q-8b-95n',
    stockCode: 'AMZN',
    companyName: 'Amazon',
    fullCompanyName: 'Amazon.com, Inc.',
  },
  {
    stockId: '8-d-q-8b-95n',
    stockCode: 'PYPL',
    companyName: 'PayPal',
    fullCompanyName: 'PayPal Holdings, Inc.',
  },
  {
    stockId: '9-d-q-8b-95n',
    stockCode: 'ZM',
    companyName: 'Zoom',
    fullCompanyName: 'Zoom Video Communications, Inc.',
  },
  {
    stockId: '10-d-q-8b-95n',
    stockCode: 'MSFT',
    companyName: 'Microsoft',
    fullCompanyName: 'Microsoft Corporation',
  },
  {
    stockId: '11-d-q-8b-95n',
    stockCode: 'AMD',
    companyName: 'AMD',
    fullCompanyName: 'Advanced Micro Devices, Inc.',
  },
  {
    stockId: '12-d-q-8b-95n',
    stockCode: 'INTC',
    companyName: 'Intel',
    fullCompanyName: 'Intel Corporation',
  },
  {
    stockId: '13-d-q-8b-95n',
    stockCode: 'SAMSUNG',
    companyName: '삼성전자',
    fullCompanyName: '삼성전자 주식회사',
  },
  {
    stockId: '14-d-q-8b-95n',
    stockCode: 'SK',
    companyName: 'SK하이닉스',
    fullCompanyName: 'SK하이닉스 주식회사',
  },
];

export const stockSearchHandlers = [
  http.get(`${BASE_URL}/api/search/complete`, ({ request }) => {
    const url = new URL(request.url);
    const keyword = url.searchParams.get('keyword') || '';

    if (keyword.length < 2) {
      return HttpResponse.json({
        code: '200 OK',
        message: '종목 검색 결과를 성공적으로 조회하였습니다.',
        content: [],
      });
    }

    const filteredResults = mockStockSearchData.filter(
      (stock) =>
        stock.companyName.toLowerCase().includes(keyword.toLowerCase()) ||
        stock.stockCode.toLowerCase().includes(keyword.toLowerCase()) ||
        stock.fullCompanyName.toLowerCase().includes(keyword.toLowerCase())
    );

    const results = filteredResults.slice(0, 5); // 결과 최대 5개까지 보여줌

    return HttpResponse.json({
      code: '200 OK',
      message: '종목 검색 결과를 성공적으로 조회하였습니다.',
      content: results,
    });
  }),
];

export const searchHandlers = [...stockSearchHandlers];
