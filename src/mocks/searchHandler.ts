import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';

const mockArticleSearchData = [
  {
    articleId: '1',
    title:
      'Bone Marrow Failure Market Growth Accelerates with Advances in Cell and Gene Therapy',
    description:
      'The bone marrow failure market is experiencing steady growth driven by increasing prevalence of bone marrow disorders.',
    shortCompanyNames: [],
    thumbnailUrl:
      'https://ml.globenewswire.com/Resource/Download/dbcddd65-71dd-4559-8875-ae89ac4f96db',
    contentUrl: 'https://www.globenewswire.com',
    publishedDate: '하루 전',
    source: 'Delveinsight',
    isFavorite: false,
  },
  {
    articleId: '25244b0a-b628-4a99-b075-9f7b080f5a65',
    title: 'The Best ETFs to Invest In Right Now',
    description:
      'The article explores two promising ETF investment opportunities: the iShares Semiconductor ETF and the Vanguard High Dividend Yield ETF.',
    shortCompanyNames: ['NVDA', 'AMD', 'INTC'],
    thumbnailUrl:
      'https://g.foolcdn.com/editorial/images/831487/artifical-intelligence-gettyimages-1276832742.jpg',
    contentUrl: 'https://www.fool.com',
    publishedDate: '하루 전',
    source: 'Joe Tenebruso',
    isFavorite: false,
  },
  {
    articleId: '750c6a09-3e34-411c-8ebc-ef2dcb1e7fb0',
    title: 'Data Center Fabric Market Report 2025-2033',
    description:
      'The global data center fabric market is projected to grow from $43.4 billion in 2024 to $228.1 billion by 2033.',
    shortCompanyNames: [],
    thumbnailUrl:
      'https://ml.globenewswire.com/Resource/Download/908fb457-7f8e-4a08-9081-5565e3dfb3d7',
    contentUrl: 'https://www.globenewswire.com',
    publishedDate: '하루 전',
    source: 'Researchandmarkets.Com',
    isFavorite: false,
  },
];

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

export const searchPreviewHandlers = [
  http.get(`${BASE_URL}/api/v1/search-preview`, ({ request }) => {
    const url = new URL(request.url);
    const keyword = url.searchParams.get('keyword') || '';

    if (keyword.length < 2) {
      return HttpResponse.json({
        code: '200 OK',
        message: '통합 검색 미리보기 결과를 성공적으로 조회하였습니다.',
        content: {
          tickerSearchList: [],
          articleSearchList: [],
        },
      });
    }

    const filteredTickers = mockTickerSearchData.filter(
      (ticker) =>
        ticker.shortCompanyName.toLowerCase().includes(keyword.toLowerCase()) ||
        ticker.tickerCode.toLowerCase().includes(keyword.toLowerCase()) ||
        ticker.fullCompanyName.toLowerCase().includes(keyword.toLowerCase())
    );

    const filteredArticles = mockArticleSearchData.filter(
      (article) =>
        article.title.toLowerCase().includes(keyword.toLowerCase()) ||
        article.description.toLowerCase().includes(keyword.toLowerCase())
    );

    return HttpResponse.json({
      code: '200 OK',
      message: '통합 검색 미리보기 결과를 성공적으로 조회하였습니다.',
      content: {
        tickerSearchList: filteredTickers.slice(0, 5),
        articleSearchList: filteredArticles.slice(0, 3),
      },
    });
  }),
];

export const articleSearchHandlers = [
  http.get(`${BASE_URL}/api/v1/article/search`, ({ request }) => {
    const url = new URL(request.url);
    const keyword = url.searchParams.get('keyword') || '';

    if (keyword.length < 2) {
      return HttpResponse.json({
        code: '200 OK',
        message: '기사 검색 결과를 성공적으로 조회하였습니다.',
        content: { articles: [] },
      });
    }

    const filtered = mockArticleSearchData.filter(
      (article) =>
        article.title.toLowerCase().includes(keyword.toLowerCase()) ||
        article.description.toLowerCase().includes(keyword.toLowerCase())
    );

    return HttpResponse.json({
      code: '200 OK',
      message: '기사 검색 결과를 성공적으로 조회하였습니다.',
      content: { articles: filtered.slice(0, 5) },
    });
  }),
];

export const searchHandlers = [
  ...searchPreviewHandlers,
  ...articleSearchHandlers,
];
