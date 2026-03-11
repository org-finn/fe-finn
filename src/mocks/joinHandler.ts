import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getJoinTickerListPath } from '@/api/hooks/useGetJoinTickerList';

export const mockTickerData = [
  {
    tickerCode: 'GOOGL',
    shortCompanyName: 'Google',
    predictionStrategy: '약한매수',
    sentiment: 1,
  },
  {
    tickerCode: 'AAPL',
    shortCompanyName: 'Apple',
    predictionStrategy: '관망',
    sentiment: 0,
  },
  {
    tickerCode: 'META',
    shortCompanyName: 'Meta',
    predictionStrategy: '약한매수',
    sentiment: 1,
  },
  {
    tickerCode: 'NFLX',
    shortCompanyName: 'Netflix',
    predictionStrategy: '강한매수',
    sentiment: 1,
  },
  {
    tickerCode: 'COIN',
    shortCompanyName: 'Coinbase',
    predictionStrategy: '약한매도',
    sentiment: -1,
  },
  {
    tickerCode: 'NVDA',
    shortCompanyName: 'NVIDIA',
    predictionStrategy: '강한매도',
    sentiment: -1,
  },
  {
    tickerCode: 'TSLA',
    shortCompanyName: 'Tesla',
    predictionStrategy: '강한매수',
    sentiment: 1,
  },
  {
    tickerCode: 'AMZN',
    shortCompanyName: 'Amazon',
    predictionStrategy: '관망',
    sentiment: 0,
  },
  {
    tickerCode: 'PYPL',
    shortCompanyName: 'PayPal',
    predictionStrategy: '약한매도',
    sentiment: -1,
  },
  {
    tickerCode: 'ZM',
    shortCompanyName: 'Zoom',
    predictionStrategy: '관망',
    sentiment: 0,
  },
  {
    tickerCode: 'MSFT',
    shortCompanyName: 'Microsoft',
    predictionStrategy: '강한매수',
    sentiment: 1,
  },
  {
    tickerCode: 'AMD',
    shortCompanyName: 'AMD',
    predictionStrategy: '약한매수',
    sentiment: 1,
  },
  {
    tickerCode: 'PLTR',
    shortCompanyName: 'Palantir',
    predictionStrategy: '관망',
    sentiment: 0,
  },
  {
    tickerCode: 'SPOT',
    shortCompanyName: 'Spotify',
    predictionStrategy: '약한매도',
    sentiment: -1,
  },
  {
    tickerCode: 'SHOP',
    shortCompanyName: 'Shopify',
    predictionStrategy: '강한매도',
    sentiment: -1,
  },
  {
    tickerCode: 'UBER',
    shortCompanyName: 'Uber',
    predictionStrategy: '약한매수',
    sentiment: 1,
  },
  {
    tickerCode: 'ABNB',
    shortCompanyName: 'Airbnb',
    predictionStrategy: '관망',
    sentiment: 0,
  },
  {
    tickerCode: 'SQ',
    shortCompanyName: 'Block',
    predictionStrategy: '약한매도',
    sentiment: -1,
  },
];

export const tickerHandlers = [
  http.get(`${BASE_URL}${getJoinTickerListPath()}`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0');
    const pageSize = 9;
    const totalItems = mockTickerData.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = mockTickerData.slice(startIndex, endIndex);

    const tickers = pageData.map((item) => {
      const isMarketOpen = Math.random() > 0.5;
      const priceData = isMarketOpen
        ? [
            177.82, 182.55, 178.88, 180.64, 186.52, 181.36, 186.6, 190.17,
            186.86, 193.8, 193.16,
          ]
        : [
            476.99, 474, 472.12, 478.43, 487.12, 493.79, 507.49, 510.18, 503.29,
            511.14, 508.68,
          ];

      return {
        ...item,
        graphData: { isMarketOpen, priceData },
      };
    });

    return HttpResponse.json({
      code: '200 OK',
      message: '종목 리스트 조회 성공',
      content: {
        tickers,
        pageNumber: page,
        hasNext: page < totalPages - 1,
      },
    });
  }),
];

export const joinHandlers = [...tickerHandlers];
