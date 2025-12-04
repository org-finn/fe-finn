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
    const param = url.searchParams.get('param') || 'keyword';
    const pageSize = 10;
    const totalItems = mockTickerData.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = mockTickerData.slice(startIndex, endIndex);

    const variantPageData = pageData.map((item) => {
      if (param === 'keyword') {
        return {
          ...item,
          positiveKeywords: 'AI 칩, 시장 성장, 주가 상승, AI 관련, 점유율',
          negativeKeywords: '고평가, 버블, 시장 위험, 우려',
        };
      } else if (param === 'article') {
        return {
          ...item,
          articleTitles: [
            {
              articleId: '5b434b63-ecbe-4a3a-85d4-d7977ed8d6c1',
              title: '뉴욕 타임스 컴퍼니 주가가 11월에 13% 상승한 이유',
            },
            {
              articleId: '5b434b63-ecbe-4a3a-85d4-d7977ed8d6c2',
              title: `UPS 주식이 시장을 이길 수 있을까요?`,
            },
          ],
        };
      } else if (param === 'graph') {
        const isMarketOpen = Math.random() > 0.5;
        const priceData = isMarketOpen
          ? [
              177.82, 182.55, 178.88, 180.64, 186.52, 181.36, 186.6, 190.17,
              186.86, 193.8, 193.16,
            ]
          : [
              476.99, 474, 472.12, 478.43, 487.12, 493.79, 507.49, 510.18,
              503.29, 511.14, 508.68,
            ];

        return {
          ...item,
          graphData: {
            isMarketOpen,
            priceData: priceData,
          },
        };
      }

      return item;
    });

    return HttpResponse.json({
      code: '200 OK',
      message: '주식 리스트를 성공적으로 조회하였습니다.',
      content: {
        predictionDate: '2025-07-22',
        predictionList: variantPageData,
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
