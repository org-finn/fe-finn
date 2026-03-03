import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getInfiniteTickerListPath } from '@/api/hooks/useGetInfiniteTickerList';
import { getTodayMarketStatusPath } from '@/api/hooks/useGetTodayMarketStatus';
import { getExchangeRatePath } from '@/api/hooks/useGetExchangeRate';
import { getArticleSummaryPath } from '@/api/hooks/useGetArticleSummary';

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

    const graphPageData = pageData.map((item) => {
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
        graphData: {
          isMarketOpen,
          priceData,
        },
      };
    });

    return HttpResponse.json({
      code: '200 OK',
      message: '주식 리스트를 성공적으로 조회하였습니다.',
      content: {
        predictionDate: '2025-07-22',
        predictionList: graphPageData,
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

export const exchangeRateHandlers = [
  http.get(`${BASE_URL}${getExchangeRatePath()}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      message: '실시간 환율 조회에 성공하였습니다.',
      content: {
        date: '2024-12-04',
        indexCode: 'C01',
        indexInfo: '원/달러',
        value: 1413.12,
        changeRate: 0.14,
      },
    });
  }),
];

export const articleSummaryHandlers = [
  http.get(`${BASE_URL}${getArticleSummaryPath()}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      content: {
        positiveReasoning: [
          'AI 및 친환경 기술 성장 잠재력 확대',
          '기업 인수, 배당 확대 등 주주 가치 증대',
          '신흥 시장 주식 및 특정 산업 높은 수익률',
        ],
        negativeReasoning: [
          '다수 기업 증권 소송 및 규제 문제',
          '일부 기업 주가 급락 및 실적 부진',
          '유가 하락 및 시장 변동성 확대',
        ],
        positiveKeywords: ['AI', '성장', '배당', '매입', '기술'],
        negativeKeywords: ['소송', '하락', '규제', '부진', '변동'],
        summaryDate: '2025-12-17',
      },
    });
  }),
];

export const mainHandlers = [
  ...tickerHandlers,
  ...holidayHandlers,
  ...exchangeRateHandlers,
  ...articleSummaryHandlers,
];
