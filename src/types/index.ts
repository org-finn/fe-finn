// 주가 아이템 컴포넌트
export type StockItemData = {
  stockId: number;
  companyName: string;
  stockCode: string;
  predictedPrice: number;
  predictedChangeRate: number;
  isUp: number;
};

// 주가 상세 데이터
export type StockDetailData = {
  stockId: number;
  companyName: string;
  stockCode: string;
  predictedPrice: number;
  predictedChangeRate: number;
  isUp: number;
  opinion: string;
  predDataList: GraphDataResponse[];
  realDataList: GraphDataResponse[];
  detailDataList: DetailDataResponse;
};

export type GraphDataResponse = {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
};

export type DetailDataResponse = {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  news: NewsDataResponse[];
};

export type NewsDataResponse = {
  newsId: string;
  headline: string;
  companyName: string;
  thumbnailUrl: string;
  contentUrl: string;
  publishedDate: string;
};
