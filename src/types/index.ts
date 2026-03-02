export type ApiResponse<T> = {
  code: string;
  message: string;
  content: T;
};

export type ArticleTitleResponse = {
  articleId: string;
  title: string;
};

export type PredictionListGraphDataResponse = {
  isMarketOpen: boolean;
  priceData: number[];
};

// 주가 아이템 컴포넌트
export type PredictionDataResponse = {
  tickerId: string;
  shortCompanyName: string;
  tickerCode: string;
  predictionStrategy: string;
  sentiment: number;
  articleCount: number;
  positiveKeywords?: string; // Optional: param=keyword
  negativeKeywords?: string;
  articleTitles?: ArticleTitleResponse[]; // Optional: param=article
  graphData?: PredictionListGraphDataResponse; // Optional: param=graph
};

export type TickerListData = {
  predictionDate: string;
  predictionList: PredictionDataResponse[];
  pageNumber: number;
  hasNext: boolean;
};

export type PageableData<T> = {
  code: string;
  message: string;
  content: T;
};

// 주가 상세 데이터
export type TickerDetailData = {
  predictionDate: string;
  tickerId: string;
  shortCompanyName: string;
  tickerCode: string;
  predictionStrategy: string;
  sentiment: number;
  articleCount: number;
  sentimentScore: number;
  detailData: DetailDataResponse;
};

export type TickerGraphDataResponse = {
  date: string;
  price: number;
  changeRate: number;
  positiveArticleRatio: number;
  negativeArticleRatio: number;
};

export type GraphData = {
  period: string;
  graphData: TickerGraphDataResponse[];
};

export type DetailDataResponse = {
  priceDate: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  article: DetailArticleData[];
};

export type ArticleDataResponse = {
  articleId: string;
  title: string;
  description: string;
  shortCompanyNames: string[];
  thumbnailUrl: string;
  contentUrl: string;
  publishedDate: string;
  source: string;
  // sentiment: string;
  // reasoning: string;
};

export type ArticleListData = {
  articleList: ArticleDataResponse[];
  pageNumber: number;
  hasNext: boolean;
};

export type DetailArticleData = {
  articleId: string;
  headline: string;
  sentiment: string;
  reasoning: string;
};

export type TickerSearchPreviewResponse = {
  tickerId: string;
  tickerCode: string;
  shortCompanyName: string;
  fullCompanyName: string;
};

export type TodayMarketStatusResponse = {
  isHoliday: boolean;
  tradingHours: string;
  eventName: string;
};

export type TickerRealTimeGraphResponse = {
  price: number;
  hours: string;
  index: number;
};

export type RealTimePriceData = {
  priceDate: string;
  tickerId: string;
  priceDataList: TickerRealTimeGraphResponse[];
  maxLen: number;
};

export type ArticleTickerListData = {
  tickerList: ArticleTickerFilteringResponse[];
};

export type ArticleTickerFilteringResponse = {
  tickerId: string;
  shortCompanyName: string;
  tickerCode: string;
};

export type ArticleDetailTickerResponse = {
  shortCompanyName: string;
  sentiment: string;
  reasoning: string;
};

export type ArticleDetailResponse = {
  articleId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  publishedDate: string;
  source: string;
  tickers: ArticleDetailTickerResponse[];
};

export type ExchangeRateResponse = {
  date: string;
  indexCode: string;
  indexInfo: string;
  value: number;
  changeRate: number;
};

export type ArticleSummaryAllResponse = {
  positiveReasoning: string[];
  negativeReasoning: string[];
  positiveKeywords: string[];
  negativeKeywords: string[];
  summaryDate: string;
};

export type ArticleSummaryTickerResponse = {
  tickerId: string;
  positiveReasoning: string[];
  negativeReasoning: string[];
  positiveKeywords: string[];
  negativeKeywords: string[];
  summaryDate: string;
};

export type OAuthLoginRequest = {
  authorizationCode: string;
  deviceType: string;
};

export type ReIssueRequest = {
  deviceType: string;
  refreshToken?: string;
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
};

export type LogoutRequest = {
  deviceType: string;
  refreshToken?: string;
};

export type ApiEmptyResponse = {
  code: string;
  content: Record<string, never>;
};

export type JoinTickerData = {
  tickerCode: string;
  shortCompanyName: string;
  predictionStrategy: string;
  sentiment: number;
  graphData: PredictionListGraphDataResponse;
};

export type JoinTickerResponse = {
  tickers: JoinTickerData[];
  pageNumber: number;
  hasNext: boolean;
};

export type FavoriteTickersRequest = {
  tickers: string[];
};

export type UserInfoResponse = {
  nickname: string;
  imageUrl?: string;
};
