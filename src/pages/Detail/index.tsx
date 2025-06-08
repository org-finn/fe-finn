import { Text } from '@/components/common/typography/Text';
import StockCharts from '@/components/Stock/StockCharts';
import { IoLogoUsd } from 'react-icons/io5';
import { StockData } from '@/types';
// import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const stockData: StockData = {
  stockId: 1,
  company: 'Aplphabet Inc.',
  stockCode: 'GOOGL',
  predictedPrice: 210.5,
  predictedChangeRate: 1.8,
  isUp: true,
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
            {stockData.company}
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
      <StockCharts />
      <OpinionContainer>
        <Text size="s" weight="bold">
          투자 의견
        </Text>
        <Opinion>
          <Text size="xs" weight="normal">
            내일{' '}
            <Text size="xs" weight="bold">
              10% 상승
            </Text>
            할 것으로 예상됩니다.
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
