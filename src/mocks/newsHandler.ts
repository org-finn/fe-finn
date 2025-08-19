import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getNewsListPath } from '@/api/hooks/useGetNewsList';

const mockNewsList = [
  {
    newsId: '1',
    title: 'Google Announces New AI Features',
    companyName: 'Google',
    thumbnailUrl: 'https://placehold.co/100',
    contentUrl: 'https://example.com/google-ai-news',
    publishedDate: '2025-05-03 오전 12:00',
    source: '연합뉴스',
    newsSentiment: 1,
  },
  {
    newsId: '2',
    title: 'Apple Unveils Latest iPhone Model',
    companyName: 'Apple',
    thumbnailUrl: 'https://placehold.co/100',
    contentUrl: 'https://example.com/apple-iphone-news',
    publishedDate: '2025-05-03 오전 12:00',
    source: '연합뉴스',
    newsSentiment: -1,
  },
  {
    newsId: '3',
    title: 'Meta Platforms Launches New VR Headset',
    companyName: 'Meta',
    thumbnailUrl: 'https://placehold.co/100',
    contentUrl: 'https://example.com/meta-vr-news',
    publishedDate: '2025-05-03 오전 12:00',
    source: '연합뉴스',
    newsSentiment: 0,
  },
  {
    newsId: '4',
    title: 'Netflix Expands Streaming Service to New Markets',
    companyName: 'Netflix',
    thumbnailUrl: 'https://placehold.co/100',
    contentUrl: 'https://example.com/netflix-expansion-news',
    publishedDate: '2025-05-03 오전 12:00',
    source: '연합뉴스',
    newsSentiment: 1,
  },
  {
    newsId: '5',
    title: 'Coinbase Announces New Cryptocurrency Features',
    companyName: 'Coinbase',
    thumbnailUrl: 'https://placehold.co/100',
    contentUrl: 'https://example.com/coinbase-crypto-news',
    publishedDate: '2025-05-03 오전 12:00',
    source: '연합뉴스',
    newsSentiment: -1,
  },
];

export const newsHandlers = [
  http.get(`${BASE_URL}${getNewsListPath()}`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');

    return HttpResponse.json({
      code: '200 OK',
      message: '뉴스 목록을 성공적으로 조회하였습니다.',
      content: {
        newsList: mockNewsList,
        pageNumber: page,
        hasNext: false,
      },
    });
  }),
];

export default newsHandlers;
