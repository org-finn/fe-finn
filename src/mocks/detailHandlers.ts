import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getTickerDetailPath } from '@/api/hooks/useGetTickerDetail';
import { getRealGraphPath } from '@/api/hooks/useGetRealGraph';
import { getRealTimePricePath } from '@/api/hooks/useGetRealTimePrice';
import { getRealTimeStreamPath } from '@/api/hooks/useGetRealTimeStream';
import { getArticleSummaryTickerPath } from '@/api/hooks/useGetArticleSummaryTicker';
import { getTickerKeywordsPath } from '@/api/hooks/useGetTickerKeywords';
import { TickerRealTimeStreamResponse } from '@/types';

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
    article: mockNewsData,
  },
  isFavorite: false,
};

const generateGraphDataWithChangeRate = (
  baseData: Array<{
    date: string;
    price: number;
    positiveArticleRatio: number;
    negativeArticleRatio: number;
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
      positiveArticleRatio: item.positiveArticleRatio,
      negativeArticleRatio: item.negativeArticleRatio,
    };
  });
};

const baseMockRealGraphData = [
  {
    date: '2025-05-09',
    price: 102.7,
    positiveArticleRatio: 0.2,
    negativeArticleRatio: 0.8,
  },
  {
    date: '2025-05-10',
    price: 101.5,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-05-11',
    price: 100.9,
    positiveArticleRatio: 0.1,
    negativeArticleRatio: 0.9,
  },
  {
    date: '2025-05-12',
    price: 101.2,
    positiveArticleRatio: 0.4,
    negativeArticleRatio: 0.6,
  },
  {
    date: '2025-05-13',
    price: 103.7,
    positiveArticleRatio: 0.18,
    negativeArticleRatio: 0.82,
  },
  {
    date: '2025-05-14',
    price: 105.2,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-05-15',
    price: 106.7,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-05-16',
    price: 108.2,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-05-17',
    price: 107.5,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-05-18',
    price: 106.3,
    positiveArticleRatio: 0.37,
    negativeArticleRatio: 0.63,
  },
  {
    date: '2025-05-19',
    price: 105.1,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-05-20',
    price: 104.7,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-05-21',
    price: 103.5,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-05-22',
    price: 102.1,
    positiveArticleRatio: 0.41,
    negativeArticleRatio: 0.59,
  },
  {
    date: '2025-05-23',
    price: 101.9,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-05-24',
    price: 104.2,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-05-25',
    price: 104.6,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-05-26',
    price: 107.3,
    positiveArticleRatio: 0.2,
    negativeArticleRatio: 0.8,
  },
  {
    date: '2025-05-27',
    price: 106.8,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-05-28',
    price: 108.9,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-05-29',
    price: 109.7,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-05-30',
    price: 110.2,
    positiveArticleRatio: 0.67,
    negativeArticleRatio: 0.33,
  },
  {
    date: '2025-05-31',
    price: 101.4,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-06-01',
    price: 111.9,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-06-02',
    price: 112.6,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-06-03',
    price: 113.2,
    positiveArticleRatio: 0.4,
    negativeArticleRatio: 0.6,
  },
  {
    date: '2025-06-04',
    price: 124.7,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-06-05',
    price: 115.9,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-06-06',
    price: 116.4,
    positiveArticleRatio: 0.5,
    negativeArticleRatio: 0.5,
  },
  {
    date: '2025-06-07',
    price: 117.7,
    positiveArticleRatio: 0,
    negativeArticleRatio: 0,
  },
  {
    date: '2025-06-08',
    price: 118.5,
    positiveArticleRatio: 0.2,
    negativeArticleRatio: 0.8,
  },
];
const realTimeGraphData = {
  priceDate: '2025-09-02',
  tickerId: '0-d-q-8b-95n',
  priceDataList: [
    { price: 182.41, hours: '23:30:00', index: 0 },
    { price: 182.55, hours: '23:31:00', index: 1 },
    { price: 182.63, hours: '23:32:00', index: 2 },
    { price: 182.48, hours: '23:33:00', index: 3 },
    { price: 182.72, hours: '23:34:00', index: 4 },
    { price: 183.01, hours: '23:35:00', index: 5 },
    { price: 183.38, hours: '23:36:00', index: 6 },
    { price: 183.55, hours: '23:37:00', index: 7 },
    { price: 183.79, hours: '23:38:00', index: 8 },
    { price: 183.91, hours: '23:39:00', index: 9 },
    { price: 184.02, hours: '23:40:00', index: 10 },
    { price: 184.18, hours: '23:41:00', index: 11 },
    { price: 184.35, hours: '23:42:00', index: 12 },
    { price: 184.51, hours: '23:43:00', index: 13 },
    { price: 184.72, hours: '23:44:00', index: 14 },
  ],
  maxLen: 240,
};

const mockRealGraphData = generateGraphDataWithChangeRate(
  baseMockRealGraphData
);

const mockKeywordsData = [
  {
    keyword: '실적호조',
    articles: [
      { articleId: '1', title: '삼성전자 실적 호조로 주가 급등' },
      { articleId: '2', title: '애플 신제품 출시 기대감 확산' },
      { articleId: '3', title: 'AI 반도체 수요 폭발적 증가세' },
    ],
    sentiment: 1,
    date: '2025-05-29',
  },
  {
    keyword: 'AI반도체',
    articles: [{ articleId: '3', title: 'AI 반도체 수요 폭발적 증가세' }],
    sentiment: 1,
    date: '2025-05-29',
  },
  {
    keyword: '신제품기대',
    articles: [
      { articleId: '2', title: '애플 신제품 출시 기대감 확산' },
      { articleId: '1', title: '삼성전자 실적 호조로 주가 급등' },
      { articleId: '5', title: '2분기 실적 시장 기대치 상회' },
      { articleId: '3', title: 'AI 반도체 수요 폭발적 증가세' },
      { articleId: '4', title: '코스피 외국인 순매수 전환' },
    ],
    sentiment: 1,
    date: '2025-05-29',
  },
  {
    keyword: '어닝서프라이즈',
    articles: [
      { articleId: '5', title: '2분기 실적 시장 기대치 상회' },
      { articleId: '3', title: 'AI 반도체 수요 폭발적 증가세' },
      { articleId: '1', title: '삼성전자 실적 호조로 주가 급등' },
      { articleId: '2', title: '애플 신제품 출시 기대감 확산' },
    ],
    sentiment: 1,
  },
  {
    keyword: '배당확대',
    articles: [],
    sentiment: 1,
    date: '2025-05-29',
  },
  {
    keyword: '금리인상',
    articles: [
      { articleId: '1', title: '금리 인상 우려에 증시 하락' },
      { articleId: '5', title: '인플레이션 예상치 웃돌아' },
      { articleId: '3', title: '달러 강세 수출주 압박' },
    ],
    sentiment: -1,
    date: '2025-05-29',
  },
  {
    keyword: '달러강세',
    articles: [
      { articleId: '3', title: '달러 강세 수출주 압박' },
      { articleId: '1', title: '금리 인상 우려에 증시 하락' },
    ],
    sentiment: -1,
    date: '2025-05-29',
  },
  {
    keyword: '공급과잉',
    articles: [
      { articleId: '6', title: '반도체 공급 과잉 우려 지속' },
      { articleId: '4', title: '중국 경기 침체 공포 확산' },
      { articleId: '5', title: '인플레이션 예상치 웃돌아' },
    ],
    sentiment: -1,
    date: '2025-05-29',
  },
  {
    keyword: '인플레이션',
    articles: [
      { articleId: '5', title: '인플레이션 예상치 웃돌아' },
      { articleId: '1', title: '금리 인상 우려에 증시 하락' },
    ],
    sentiment: -1,
    date: '2025-05-29',
  },
  {
    keyword: '규제리스크',
    articles: [],
    sentiment: -1,
    date: '2025-05-29',
  },
];

const mockArticleSummary = {
  tickerId: '0-d-q-8b-95n',
  positiveReasoning: [
    'AI 선두 주자, 수익 증가',
    '강력한 AI 인프라 수요',
    '과대평가 아님, 마진 확대',
  ],
  negativeReasoning: [
    '대중국 수출 규제 위험',
    '고객 집중도 높음',
    '경쟁 심화, 밸류에이션 우려',
  ],
  positiveKeywords: ['AI선두', 'CUDA', '수익성장', '인프라', '장기매수'],
  negativeKeywords: ['수출규제', '고객집중', '경쟁심화', '전력망', '고평가'],
  summaryDate: '2025-12-26',
};

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
  http.get(`${BASE_URL}${getRealTimeStreamPath('0-d-q-8b-95n')}`, () => {
    const encoder = new TextEncoder();
    const mockStreamEvents: TickerRealTimeStreamResponse[] = [
      {
        time: '23:45:15',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9001,
        volume: 1247,
      },
      {
        time: '23:45:15',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9,
        volume: 276,
      },
      {
        time: '23:45:15',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.885,
        volume: 211,
      },
      {
        time: '23:45:15',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9,
        volume: 553,
      },
      {
        time: '23:45:16',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.91,
        volume: 3514,
      },
      {
        time: '23:45:16',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9201,
        volume: 989,
      },
      {
        time: '23:45:16',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.95,
        volume: 515,
      },
      {
        time: '23:45:16',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9739,
        volume: 280,
      },
      {
        time: '23:45:17',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9739,
        volume: 52,
      },
      {
        time: '23:45:17',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9899,
        volume: 15371,
      },
      {
        time: '23:45:17',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9801,
        volume: 629,
      },
      {
        time: '23:45:17',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.98,
        volume: 200,
      },
      {
        time: '23:45:17',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9737,
        volume: 644,
      },
      {
        time: '23:45:17',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.98,
        volume: 355,
      },
      {
        time: '23:45:17',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9899,
        volume: 306,
      },
      {
        time: '23:45:18',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.985,
        volume: 200,
      },
      {
        time: '23:45:18',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.985,
        volume: 381,
      },
      {
        time: '23:45:18',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9735,
        volume: 1301,
      },
      {
        time: '23:45:18',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9801,
        volume: 420,
      },
      {
        time: '23:45:18',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9899,
        volume: 301,
      },
      {
        time: '23:45:19',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.98,
        volume: 59,
      },
      {
        time: '23:45:19',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9776,
        volume: 260,
      },
      {
        time: '23:45:19',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9763,
        volume: 448,
      },
      {
        time: '23:45:19',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.97,
        volume: 193,
      },
      {
        time: '23:45:19',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9815,
        volume: 130,
      },
      {
        time: '23:45:20',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9699,
        volume: 350,
      },
      {
        time: '23:45:20',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.97,
        volume: 193,
      },
      {
        time: '23:45:20',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.98,
        volume: 846,
      },
      {
        time: '23:45:20',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.98,
        volume: 103,
      },
      {
        time: '23:45:20',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.975,
        volume: 100,
      },
      {
        time: '23:45:21',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.95,
        volume: 42,
      },
      {
        time: '23:45:21',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.973,
        volume: 1100,
      },
      {
        time: '23:45:21',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.96,
        volume: 144,
      },
      {
        time: '23:45:21',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.951,
        volume: 297,
      },
      {
        time: '23:45:21',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.985,
        volume: 200,
      },
      {
        time: '23:45:21',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.985,
        volume: 192,
      },
      {
        time: '23:45:21',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.98,
        volume: 110,
      },
      {
        time: '23:45:22',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.97,
        volume: 108,
      },
      {
        time: '23:45:22',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9751,
        volume: 250,
      },
      {
        time: '23:45:22',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.97,
        volume: 138,
      },
      {
        time: '23:45:22',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.97,
        volume: 1500,
      },
      {
        time: '23:45:22',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.978,
        volume: 290,
      },
      {
        time: '23:45:22',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9766,
        volume: 114,
      },
      {
        time: '23:45:22',
        open: 182.4,
        high: 184.99,
        low: 182.0101,
        close: 184.9751,
        volume: 400,
      },
    ];

    let timeoutIds: ReturnType<typeof setTimeout>[] = [];

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            'event:connect\ndata:connected to e65bd0db-c2c2-4168-8f42-2d9b50388337\n\n'
          )
        );

        mockStreamEvents.forEach((data, i) => {
          const id = setTimeout(
            () => {
              controller.enqueue(
                encoder.encode(
                  `event:ticker-price\ndata:${JSON.stringify(data)}\n\n`
                )
              );
              if (i === mockStreamEvents.length - 1) {
                controller.close();
              }
            },
            (i + 1) * 300
          );
          timeoutIds.push(id);
        });
      },
      cancel() {
        timeoutIds.forEach(clearTimeout);
        timeoutIds = [];
      },
    });

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  }),
  http.get(
    `${BASE_URL}${getTickerKeywordsPath('0-d-q-8b-95n', '2025-05-29')}`,
    ({ request }) => {
      const url = new URL(request.url);
      const date = url.searchParams.get('date') ?? '2025-05-29';
      const keywords = mockKeywordsData.map((kw) => ({ ...kw, date }));

      return HttpResponse.json({
        code: '200 OK',
        message: '키워드/관련 아티클 목록을 성공적으로 조회하였습니다.',
        content: { keywords },
      });
    }
  ),
  http.get(
    `${BASE_URL}${getArticleSummaryTickerPath('0-d-q-8b-95n', '2025-05-29')}`,
    () => {
      return HttpResponse.json({
        code: '200 OK',
        message: '종목 뉴스 요약 데이터 조회에 성공하였습니다.',
        content: mockArticleSummary,
      });
    }
  ),
];

export default detailHandlers;
