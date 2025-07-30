export type ApiResponse<T> = {
  code: string;
  message: string;
  content: T;
};

// 주가 아이템 컴포넌트
export type StockItemData = {
  stockId: string;
  companyName: string;
  stockCode: string;
  predictedPrice: number;
  predictedChangeRate: string;
  isUp: number;
};

export type StockListData = {
  predictionDate: string;
  stockList: StockItemData[];
  pageNumber: number;
  hasNext: boolean;
};

export type PageableData<T> = {
  code: string;
  message: string;
  content: T;
};

// 주가 상세 데이터
export type StockDetailData = {
  predictionDate: string;
  stockId: string;
  companyName: string;
  stockCode: string;
  predictedPrice: number;
  predictedChangeRate: string;
  isUp: number;
  opinion: string;
  detailData: DetailDataResponse;
};

export type GraphDataResponse = {
  date: string;
  price: number;
};
export type GraphData = {
  period: string;
  graphData: GraphDataResponse[];
};

export type DetailDataResponse = {
  priceDate: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  news: RotationNewsData[];
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

export type RotationNewsData = {
  newsId: string;
  headline: string;
  newsSentiment: number;
};
