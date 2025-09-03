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
  positiveArticleCount: number;
  negativeArticleCount: number;
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

export type CompanyNameList = {
  shortCompanyName: string;
};

export type ArticleDataResponse = {
  articleId: string;
  title: string;
  description: string;
  shortCompanyNames: CompanyNameList[];
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
