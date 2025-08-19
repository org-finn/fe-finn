import { Text } from '@/components/common/typography/Text';
import StockCharts from '@/components/Stock/StockCharts';
import { IoLogoUsd } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useGetVariant from '@/hooks/useGetVariant';
import useGetSignSymbol from '@/hooks/useGetSignSymbol';
import { useGetStockDetail } from '@/api/hooks/useGetStockDetail';
import { useGetPredGraph, PredGraphPeriod } from '@/api/hooks/useGetPredGraph';
import { useGetRealGraph } from '@/api/hooks/useGetRealGraph';
import Loading from '@/components/common/Layout/Loading';
import { useState } from 'react';

export default function DetailPage() {
  const { id } = useParams() as { id: string };
  const [period, setPeriod] = useState<PredGraphPeriod>('2W');

  const {
    data: stockResponse,
    isLoading: stockLoading,
    error: stockError,
  } = useGetStockDetail(id);
  const {
    data: predGraphResponse,
    isLoading: predGraphLoading,
    error: predGraphError,
  } = useGetPredGraph({
    stockId: id,
    period,
  });

  const {
    data: realGraphResponse,
    isLoading: realGraphLoading,
    error: realGraphError,
  } = useGetRealGraph({
    stockId: id,
    period,
  });

  const stockData = stockResponse?.content;
  const predGraphData = predGraphResponse?.content;
  const realGraphData = realGraphResponse?.content;

  const getVariant = useGetVariant(stockData?.isUp ?? 0);
  const getSignSymbol = useGetSignSymbol(stockData?.isUp ?? 0);

  const isLoading = stockLoading || predGraphLoading || realGraphLoading;
  const error = stockError || predGraphError || realGraphError;

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
      <PeriodSelector>
        {(['2W', '1M', '6M', '1Y'] as PredGraphPeriod[]).map((p) => (
          <PeriodButton
            key={p}
            $active={period === p}
            onClick={() => setPeriod(p)}
          >
            {p}
          </PeriodButton>
        ))}
      </PeriodSelector>

      {predGraphData && realGraphData && (
        <StockCharts
          predData={predGraphData.graphData || []}
          realData={realGraphData.graphData || []}
          isUp={stockData.isUp ?? 0}
        />
      )}

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
const PeriodSelector = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
`;
const PeriodButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${(props) => (props.$active ? '#47c8d9' : '#ddd')};
  background-color: ${(props) => (props.$active ? '#47c8d9' : 'white')};
  color: ${(props) => (props.$active ? 'white' : '#666')};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    border-color: #47c8d9;
    background-color: ${(props) => (props.$active ? '#47c8d9' : '#f0f9fa')};
  }
`;
const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #e74c3c;
`;
