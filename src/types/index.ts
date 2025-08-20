export type ApiResponse<T> = {
  code: string;
  message: string;
  content: T;
};

// 주가 아이템 컴포넌트
export type PredictionDataResponse = {
  tickerId: string;
  shortCompanyName: string;
  tickerCode: string;
  predictionStrategy: string;
  sentiment: number;
  newsCount: number;
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
  news: ArticleDataResponse[];
};

export type NewsDataResponse = {
  newsId: string;
  title: string;
  companyName: string;
  thumbnailUrl: string;
  contentUrl: string;
  publishedDate: string;
  source: string;
  newsSentiment: number;
};

export type NewsListData = {
  newsList: NewsDataResponse[];
  pageNumber: number;
  hasNext: boolean;
};

export type ArticleDataResponse = {
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
