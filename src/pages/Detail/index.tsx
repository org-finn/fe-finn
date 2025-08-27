import { Text } from '@/components/common/typography/Text';
import TickerCharts from '@/components/Ticker/TickerCharts';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useGetVariant from '@/hooks/useGetVariant';
import useGetSignSymbol from '@/hooks/useGetSignSymbol';
import { useGetTickerDetail } from '@/api/hooks/useGetTickerDetail';
import { useGetRealGraph, RealGraphPeriod } from '@/api/hooks/useGetRealGraph';
import Loading from '@/components/common/Layout/Loading';
import { useState } from 'react';

export default function DetailPage() {
  const { id } = useParams() as { id: string };
  const [period, setPeriod] = useState<RealGraphPeriod>('2W');

  const {
    data: tickerResponse,
    isLoading: tickerLoading,
    error: tickerError,
  } = useGetTickerDetail(id);
  const {
    data: realGraphResponse,
    isLoading: realGraphLoading,
    error: realGraphError,
  } = useGetRealGraph({
    tickerId: id,
    period,
  });

  const tickerData = tickerResponse?.content;
  const realGraphData = realGraphResponse?.content;

  const getVariant = useGetVariant(tickerData?.sentiment ?? 0);
  const getSignSymbol = useGetSignSymbol(tickerData?.sentiment ?? 0);
  const getSentiment =
    (tickerData?.sentiment ?? 0) > 0
      ? '긍정'
      : (tickerData?.sentiment ?? 0) < 0
        ? '부정'
        : '관련';
  const isLoading = tickerLoading || realGraphLoading;
  const error = tickerError || realGraphError;

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return (
      <ErrorMessage>데이터를 불러오는 중 오류가 발생했습니다.</ErrorMessage>
    );
  }
  if (!tickerData) {
    return <ErrorMessage>주식 정보를 찾을 수 없습니다.</ErrorMessage>;
  }

  return (
    <Wrapper>
      <TickerTitle>
        <TickerInfo>
          <Text size="m" weight="bold">
            {tickerData.tickerCode || ''}
          </Text>
          <Text size="xs" weight="normal" variant="grey">
            {tickerData.shortCompanyName || ''}
          </Text>
        </TickerInfo>
        <PriceInfo>
          <Text size="m" weight="bold" variant={getVariant}>
            {getSignSymbol} {tickerData.predictionStrategy} 추천
          </Text>
          <Text size="xs" weight="bold" variant={getVariant}>
            {getSentiment} 기사 {tickerData.articleCount}건
          </Text>
        </PriceInfo>
      </TickerTitle>
      <PeriodSelector>
        {(['2W', '1M', '6M', '1Y'] as RealGraphPeriod[]).map((p) => (
          <PeriodButton
            key={p}
            $active={period === p}
            onClick={() => setPeriod(p)}
          >
            {p}
          </PeriodButton>
        ))}
      </PeriodSelector>
      {realGraphData && (
        <TickerCharts
          realData={realGraphData.graphData || []}
          sentiment={tickerData.sentiment ?? 0}
        />
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const TickerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 6px;
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
const TickerTitle = styled.div`
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
