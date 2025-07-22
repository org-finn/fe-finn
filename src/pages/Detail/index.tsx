import { Text } from '@/components/common/typography/Text';
// import StockCharts from '@/components/Stock/StockCharts';
import { IoLogoUsd } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useGetVariant from '@/hooks/useGetVariant';
import useGetSignSymbol from '@/hooks/useGetSignSymbol';
import { useGetStockDetail } from '@/api/hooks/useGetStockDetail';
import Loading from '@/components/common/Layout/Loading';

export default function DetailPage() {
  const { id } = useParams() as { id: string };
  const { data: response, isLoading, error } = useGetStockDetail(id);

  const stockData = response?.content;
  const getVariant = useGetVariant(stockData?.isUp ?? 0);
  const getSignSymbol = useGetSignSymbol(stockData?.isUp ?? 0);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return (
      <ErrorMessage>데이터를 불러오는 중 오류가 발생했습니다.</ErrorMessage>
    );
  }
  if (!stockData) {
    return <ErrorMessage>주식 정보를 찾을 수 없습니다.</ErrorMessage>;
  }

  return (
    <Wrapper>
      <StockTitle>
        <StockInfo>
          <Text size="m" weight="bold">
            {stockData.stockCode || ''}
          </Text>
          <Text size="xs" weight="normal" variant="grey">
            {stockData.companyName || ''}
          </Text>
        </StockInfo>
        <PriceInfo>
          <Text size="m" weight="bold" variant={getVariant}>
            {getSignSymbol}
            <IoLogoUsd size={18} />
            {stockData.predictedPrice || 0}
          </Text>
          <Text size="s" weight="bold" variant={getVariant}>
            {stockData.predictedChangeRate || 0}%
          </Text>
        </PriceInfo>
      </StockTitle>
      {/* <StockCharts
        predData={stockData.predDataList || []}
        realData={stockData.realDataList || []}
        isUp={stockData.isUp ?? false}
      /> */}
      <OpinionContainer>
        <Text size="s" weight="bold">
          투자 의견
        </Text>
        <Opinion>
          <Text size="xs" weight="normal">
            {stockData.opinion || '투자 의견이 없습니다.'}
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
const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #e74c3c;
`;
