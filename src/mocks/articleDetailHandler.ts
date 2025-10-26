import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getArticleDetailPath } from '@/api/hooks/useGetArticleDetail';

const mockArticleDetail = {
  articleId: '1',
  title:
    'Activist Investor Seeks Strategic Overhaul At Contact Lens Maker Cooper, Suggests Merger With Bausch + Lomb',
  description:
    "Activist investor Jana Partners has taken a stake in Cooper Companies and is pushing for strategic alternatives, including a potential merger between Cooper's contact lens division and Bausch + Lomb to improve shareholder value.",
  thumbnailUrl:
    'https://cdn.benzinga.com/files/images/story/2025/10/20/Close-up-Of-A-Contact-Lens-For-Vision-On.jpeg?width=1200&height=800&fit=crop',
  contentUrl:
    'https://www.benzinga.com/news/health-care/25/10/48305929/activist-investor-seeks-strategic-overhaul-at-contact-lens-maker-cooper-suggests-merger-with-bau',
  publishedDate: '2025-10-20T23:57:45',
  source: 'Vandana Singh',
  tickers: [
    {
      shortCompanyName: 'Johnson & Johnson',
      sentiment: 'negative',
      reasoning:
        'Mentioned as a competitor in contact lens segment with no specific strategic developments',
    },
  ],
};

export const articleDetailHandlers = [
  http.get(`${BASE_URL}${getArticleDetailPath('1')}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      content: mockArticleDetail,
    });
  }),
];

export default articleDetailHandlers;
