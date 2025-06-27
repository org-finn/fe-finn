import { Text } from '@/components/common/typography/Text';
import StockCharts from '@/components/Stock/StockCharts';
import { IoLogoUsd } from 'react-icons/io5';
import { StockDetailData } from '@/types';
// import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { predictedData, realData } from '@/constants/dummy';

const stockData: StockDetailData = {
  stockId: 1,
  companyName: 'Aplphabet Inc.',
  stockCode: 'GOOGL',
  predictedPrice: 210.5,
  predictedChangeRate: 1.8,
  isUp: true,
  opinion: '내일 1.8% 상승할 것으로 예상됩니다.',
  predDataList: predictedData, // 예측한 값
  realDataList: realData, // 실제 값
  detailDataList: {
    date: '2025-06-08',
    open: 117.7,
    close: 118.5,
    high: 119.1,
    low: 116.3,
    volume: 1,
    news: [],
  },
};

export default function DetailPage() {
  // const { id } = useParams() as { id: string };
  // const { data: stockData } = useGetStockData(id);
  return (
    <Wrapper>
      <StockTitle>
        <StockInfo>
          <Text size="m" weight="bold">
            {stockData.stockCode}
          </Text>
          <Text size="xs" weight="normal" variant="grey">
            {stockData.companyName}
          </Text>
        </StockInfo>
        <PriceInfo>
          <Text
            size="m"
            weight="bold"
            variant={stockData.isUp ? 'red' : 'blue'}
          >
            {stockData.isUp ? `+` : `-`}
            <IoLogoUsd size={18} />
            {stockData.predictedPrice}
          </Text>
          <Text
            size="s"
            weight="bold"
            variant={stockData.isUp ? 'red' : 'blue'}
          >
            {stockData.predictedChangeRate}%
          </Text>
        </PriceInfo>
      </StockTitle>
      <StockCharts
        predData={stockData.predDataList}
        realData={stockData.realDataList}
        isUp={stockData.isUp}
      />
      <OpinionContainer>
        <Text size="s" weight="bold">
          투자 의견
        </Text>
        <Opinion>
          <Text size="xs" weight="normal">
            {stockData.opinion}
          </Text>
        </Opinion>
      </OpinionContainer>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StockInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 6px;
`;
const OpinionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 30px;
`;
const Opinion = styled.div`
  background-color: #f7faff;
  padding: 20px;
  border-radius: 10px;
`;
const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  span {
    display: inline-flex;
    justify-content: end;
  }
  svg {
    margin-right: -3px;
  }
`;
const StockTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
  color: black;
`;
