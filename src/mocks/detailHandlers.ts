import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getTickerDetailPath } from '@/api/hooks/useGetTickerDetail';
import { getRealGraphPath } from '@/api/hooks/useGetRealGraph';
import { getRealTimePricePath } from '@/api/hooks/useGetRealTimePrice';

const mockNewsData = [
  {
    articleId: '9587a419-392e-4e38-b990-785fcbdbe665',
    headline:
      "This 'Small' 7.2% Dividend Is An Oasis of Cheap in a Pricey Market",
    sentiment: 'neutral',
    reasoning:
      'Part of the large-cap tech group that has dominated market performance, potentially overvalued and due for a correction',
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
  shortCompanyName: 'Google',
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
    low: 16.3,
    volume: 1539200,
    news: mockNewsData,
  },
};

const generateGraphDataWithChangeRate = (
  baseData: Array<{
    date: string;
    price: number;
    positiveArticleCount: number;
    negativeArticleCount: number;
  }>
) => {
  return baseData.map((item, index) => {
    let changeRate = 0;
    if (index > 0) {
      const prevPrice = baseData[index - 1].price;
      changeRate = ((item.price - prevPrice) / prevPrice) * 100;
    }

    return {
      date: item.date,
      price: item.price,
      changeRate: Number(changeRate.toFixed(2)),
      positiveArticleCount: item.positiveArticleCount,
      negativeArticleCount: item.negativeArticleCount,
    };
  });
};

const baseMockRealGraphData = [
  {
    date: '2025-05-09',
    price: 102.7,
    positiveArticleCount: 2,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-10',
    price: 101.5,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-11',
    price: 100.9,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-12',
    price: 101.2,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-13',
    price: 103.7,
    positiveArticleCount: 1,
    negativeArticleCount: 2,
  },
  {
    date: '2025-05-14',
    price: 105.2,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-15',
    price: 106.7,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-16',
    price: 108.2,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-17',
    price: 107.5,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-18',
    price: 106.3,
    positiveArticleCount: 3,
    negativeArticleCount: 1,
  },
  {
    date: '2025-05-19',
    price: 105.1,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-20',
    price: 104.7,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-21',
    price: 103.5,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-22',
    price: 102.1,
    positiveArticleCount: 1,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-23',
    price: 101.9,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-24',
    price: 104.2,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-25',
    price: 104.6,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-26',
    price: 107.3,
    positiveArticleCount: 2,
    negativeArticleCount: 3,
  },
  {
    date: '2025-05-27',
    price: 106.8,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-28',
    price: 108.9,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-29',
    price: 109.7,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-05-30',
    price: 110.2,
    positiveArticleCount: 1,
    negativeArticleCount: 1,
  },
  {
    date: '2025-05-31',
    price: 101.4,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-06-01',
    price: 111.9,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-06-02',
    price: 112.6,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-06-03',
    price: 113.2,
    positiveArticleCount: 4,
    negativeArticleCount: 0,
  },
  {
    date: '2025-06-04',
    price: 124.7,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-06-05',
    price: 115.9,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-06-06',
    price: 116.4,
    positiveArticleCount: 0,
    negativeArticleCount: 2,
  },
  {
    date: '2025-06-07',
    price: 117.7,
    positiveArticleCount: 0,
    negativeArticleCount: 0,
  },
  {
    date: '2025-06-08',
    price: 118.5,
    positiveArticleCount: 2,
    negativeArticleCount: 1,
  },
];
const realTimeGraphData = {
  priceDate: '2025-09-02',
  tickerId: '0-d-q-8b-95n',
  priceDataList: [
    {
      price: 501.075,
      hours: '15:25:00',
      index: 23,
    },
    {
      price: 500.94,
      hours: '15:30:00',
      index: 24,
    },
    {
      price: 500.915,
      hours: '15:35:00',
      index: 25,
    },
    {
      price: 500.48,
      hours: '15:40:00',
      index: 26,
    },
    {
      price: 500.81,
      hours: '15:45:00',
      index: 27,
    },
    {
      price: 500.71,
      hours: '15:50:00',
      index: 28,
    },
    {
      price: 500.61,
      hours: '15:55:00',
      index: 29,
    },
    {
      price: 500.77,
      hours: '16:00:00',
      index: 30,
    },
    {
      price: 500.69,
      hours: '16:05:00',
      index: 31,
    },
    {
      price: 500.935,
      hours: '16:10:00',
      index: 32,
    },
    {
      price: 501.03,
      hours: '16:15:00',
      index: 33,
    },
    {
      price: 501.44,
      hours: '16:20:00',
      index: 34,
    },
    {
      price: 501.39,
      hours: '16:25:00',
      index: 35,
    },
    {
      price: 500.965,
      hours: '16:30:00',
      index: 36,
    },
    {
      price: 501.07,
      hours: '16:35:00',
      index: 37,
    },
    {
      price: 500.82,
      hours: '16:40:00',
      index: 38,
    },
    {
      price: 501.25,
      hours: '16:45:00',
      index: 39,
    },
    {
      price: 501.07,
      hours: '16:50:00',
      index: 40,
    },
    {
      price: 501.32,
      hours: '16:55:00',
      index: 41,
    },
    {
      price: 501.53,
      hours: '17:00:00',
      index: 42,
    },
    {
      price: 501.36,
      hours: '17:05:00',
      index: 43,
    },
    {
      price: 501,
      hours: '17:10:00',
      index: 44,
    },
    {
      price: 500.45,
      hours: '17:15:00',
      index: 45,
    },
    {
      price: 500.81,
      hours: '17:20:00',
      index: 46,
    },
    {
      price: 501.45,
      hours: '17:25:00',
      index: 47,
    },
    {
      price: 501.96,
      hours: '17:30:00',
      index: 48,
    },
    {
      price: 502.725,
      hours: '17:35:00',
      index: 49,
    },
    {
      price: 502.78,
      hours: '17:40:00',
      index: 50,
    },
    {
      price: 502.54,
      hours: '17:45:00',
      index: 51,
    },
    {
      price: 502.6301,
      hours: '17:50:00',
      index: 52,
    },
    {
      price: 502.54,
      hours: '17:55:00',
      index: 53,
    },
    {
      price: 502.29,
      hours: '18:00:00',
      index: 54,
    },
    {
      price: 502.76,
      hours: '18:05:00',
      index: 55,
    },
    {
      price: 502.315,
      hours: '18:10:00',
      index: 56,
    },
    {
      price: 502.6475,
      hours: '18:15:00',
      index: 57,
    },
    {
      price: 501.85,
      hours: '18:20:00',
      index: 58,
    },
    {
      price: 501.775,
      hours: '18:25:00',
      index: 59,
    },
    {
      price: 501.44,
      hours: '18:30:00',
      index: 60,
    },
    {
      price: 501.6875,
      hours: '18:35:00',
      index: 61,
    },
    {
      price: 501.85,
      hours: '18:40:00',
      index: 62,
    },
  ],
  maxLen: 240,
};

const mockRealGraphData = generateGraphDataWithChangeRate(
  baseMockRealGraphData
);
export const detailHandlers = [
  http.get(`${BASE_URL}${getTickerDetailPath('0-d-q-8b-95n')}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      message: '종목 예측 상세 정보를 성공적으로 조회하였습니다.',
      content: mockTickerDetail,
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
  http.get(
    `${BASE_URL}${getRealTimePricePath('0-d-q-8b-95n')}`,
    ({ request }) => {
      const url = new URL(request.url);
      const gte = url.searchParams.get('gte');
      const missing = url.searchParams.getAll('missing').map(Number);

      let filteredPriceDataList = [...realTimeGraphData.priceDataList];

      if (gte !== null) {
        const gteValue = Number(gte);
        filteredPriceDataList = filteredPriceDataList.filter(
          (item) => item.index >= gteValue
        );
      }

      if (missing && missing.length > 0) {
        filteredPriceDataList = filteredPriceDataList.filter((item) =>
          missing.includes(item.index)
        );
      }

      return HttpResponse.json({
        code: '200 OK',
        message: '실시간 종목 주가 데이터를 성공적으로 조회하였습니다.',
        content: {
          ...realTimeGraphData,
          priceDataList: filteredPriceDataList,
        },
      });
    }
  ),
];

export default detailHandlers;
