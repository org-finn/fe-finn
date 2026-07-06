import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getUserInfoPath } from '@/api/hooks/useGetUserInfo';
import { getFavoriteTickersPath } from '@/api/hooks/useGetFavoriteTickers';
import { putFavoriteTickerPath } from '@/api/hooks/usePutFavoriteTicker';
import { getFavoriteArticlesPath } from '@/api/hooks/useGetFavoriteArticles';
import { putFavoriteArticlePath } from '@/api/hooks/usePutFavoriteArticle';
import { mockTickerData } from './joinHandler';

const mockFavoriteArticles = [
  {
    articleId: '25244b0a-b628-4a99-b075-9f7b080f5a65',
    title: 'The Best ETFs to Invest In Right Now',
    description:
      'The article explores two promising ETF investment opportunities: the iShares Semiconductor ETF for capitalizing on the AI chip market growth, and the Vanguard High Dividend Yield ETF for generating passive income through diversified dividend stocks.',
    shortCompanyNames: ['NVDA', 'AMD', 'INTC'],
    thumbnailUrl:
      'https://g.foolcdn.com/editorial/images/831487/artifical-intelligence-gettyimages-1276832742.jpg',
    contentUrl:
      'https://www.fool.com/investing/2025/09/01/the-best-etfs-to-invest-in-right-now/',
    publishedDate: '2025-05-03 오전 12:00',
    source: 'Joe Tenebruso',
  },
  {
    articleId: '864aeeb4-5508-4240-99f2-152098c4330e',
    title:
      'Michelin completes the divestment of its bias tires and tracks for compact construction equipment activities',
    description:
      'Michelin has completed the sale of its bias tires and tracks for compact construction equipment, including two plants in Sri Lanka and the Camso brand. The divestment aligns with their 2030 sustainable growth strategy and will help strengthen financial performance.',
    shortCompanyNames: ['MGDDY'],
    thumbnailUrl:
      'https://ml-eu.globenewswire.com/Resource/Download/cb56be7e-dfca-431e-8485-d83eb00a3d58',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142233/0/en/Michelin-completes-the-divestment.html',
    publishedDate: '2025-05-02 오후 3:00',
    source: 'Michelin',
  },
  {
    articleId: '750c6a09-3e34-411c-8ebc-ef2dcb1e7fb0',
    title:
      'Data Center Fabric Market Report 2025-2033 | Cloud Migration, Big Data Analytics, IoT, Edge Computing, and Regulatory Compliance Fuel Global Demand',
    description:
      'The global data center fabric market is projected to grow from $43.4 billion in 2024 to $228.1 billion by 2033, driven by cloud computing, IoT, big data analytics, and regulatory compliance needs.',
    shortCompanyNames: ['AMZN', 'MSFT', 'GOOGL'],
    thumbnailUrl:
      'https://ml.globenewswire.com/Resource/Download/908fb457-7f8e-4a08-9081-5565e3dfb3d7',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142202/28124/en/Data-Center-Fabric-Market-Report.html',
    publishedDate: '2025-05-01 오전 9:00',
    source: 'Researchandmarkets.Com',
  },
  {
    articleId: 'd5dd7779-e10b-4e00-a258-ccdf49a3a60f',
    title: 'Block listing Interim Review',
    description:
      'Admiral Group Plc filed an interim review of its Share Incentive Plan and Employee Benefit Trust, reporting no new securities issued during the period from March to August 2025.',
    shortCompanyNames: [],
    thumbnailUrl:
      'https://ml-eu.globenewswire.com/Resource/Download/5f4bde37-efde-4532-a216-0e9d1981ad6f',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142205/0/en/Block-listing-Interim-Review.html',
    publishedDate: '2025-04-30 오후 1:00',
    source: 'Dan Caunt',
  },
  {
    articleId: '62819f7f-d6f0-44e9-abea-92b8b1f7ef97',
    title:
      'Europe HVO for Data Center Backup Market Report 2025-2034, with Profiles of Neste, Repsol, TotalEnergies and More',
    description:
      'The European HVO market for data center backup power is projected to grow from $6.69 million in 2024 to $21.67 million by 2034, driven by demand for low-emission, eco-friendly backup power solutions in data centers.',
    shortCompanyNames: ['TTE', 'RPSN'],
    thumbnailUrl:
      'https://ml.globenewswire.com/Resource/Download/908fb457-7f8e-4a08-9081-5565e3dfb3d7',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142204/28124/en/Europe-HVO-for-Data-Center-Backup-Market-Report.html',
    publishedDate: '2025-04-29 오전 10:30',
    source: 'Researchandmarkets.Com',
  },
];

export const mockFavoriteTickers = mockTickerData.slice(0, 5).map((item) => {
  const isMarketOpen = Math.random() > 0.5;
  const priceData = isMarketOpen
    ? [
        177.82, 182.55, 178.88, 180.64, 186.52, 181.36, 186.6, 190.17, 186.86,
        193.8, 193.16,
      ]
    : [
        476.99, 474, 472.12, 478.43, 487.12, 493.79, 507.49, 510.18, 503.29,
        511.14, 508.68,
      ];

  return {
    tickerId: Math.random().toString(36).slice(2),
    ...item,
    graphData: { isMarketOpen, priceData },
  };
});

export const myPageHandlers = [
  http.get(`${BASE_URL}${getUserInfoPath()}`, () => {
    return HttpResponse.json({
      code: '200',
      message: 'success',
      content: {
        nickname: '가나디',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEH9YJyZ8cIW7fXHzSw3N_PpYE6JFkcrUtKw&s',
      },
    });
  }),

  http.get(`${BASE_URL}${getFavoriteTickersPath()}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      message: '관심 종목 리스트 조회 성공',
      content: {
        tickers: mockFavoriteTickers,
      },
    });
  }),

  http.put(`${BASE_URL}${putFavoriteTickerPath()}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      message: '관심 종목 변경 성공',
      content: {},
    });
  }),

  http.get(`${BASE_URL}${getFavoriteArticlesPath()}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      message: '스크랩 기사 목록 조회 성공',
      content: {
        articles: mockFavoriteArticles,
      },
    });
  }),

  http.put(`${BASE_URL}${putFavoriteArticlePath()}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      message: '스크랩 기사 변경 성공',
      content: {},
    });
  }),
];
