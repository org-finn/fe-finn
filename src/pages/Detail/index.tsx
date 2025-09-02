import { Text } from '@/components/common/typography/Text';
import TickerCharts from '@/components/Ticker/TickerCharts';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
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
        <Text size="l" weight="bold">
          {tickerData.shortCompanyName}
        </Text>
        <Text size="s" weight="normal" variant="grey">
          {tickerData.tickerCode}
        </Text>
      </TickerTitle>
      <TickerInfo>
        <InfoGrid>
          <InfoItem>
            <Text size="xs" weight="normal">
              시가
            </Text>
            <Text size="xs" weight="normal" variant="grey">
              $ {tickerData.detailData.open}
            </Text>
          </InfoItem>

          <InfoItem>
            <Text size="xs" weight="normal">
              종가
            </Text>
            <Text size="xs" weight="normal" variant="grey">
              $ {tickerData.detailData.close}
            </Text>
          </InfoItem>

          <InfoItem>
            <Text size="xs" weight="normal">
              고가
            </Text>
            <Text size="xs" weight="normal" variant="grey">
              $ {tickerData.detailData.high}
            </Text>
          </InfoItem>

          <InfoItem>
            <Text size="xs" weight="normal">
              저가
            </Text>
            <Text size="xs" weight="normal" variant="grey">
              $ {tickerData.detailData.low}
            </Text>
          </InfoItem>

          <InfoItem>
            <Text size="xs" weight="normal">
              거래량
            </Text>
            <Text size="xs" weight="normal" variant="grey">
              {tickerData.detailData.volume.toLocaleString()}주
            </Text>
          </InfoItem>
          <ItemDate>
            <Text size="xxs" weight="normal" variant="grey">
              * 8월 1일 기준
            </Text>
          </ItemDate>
        </InfoGrid>
      </TickerInfo>
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
  padding: 16px 0;
`;
const TickerTitle = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;
const TickerInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
`;
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 340px;
  border-radius: 8px;
  gap: 24px;
  padding-top: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 0px 26px;

  &:nth-child(5) {
    grid-column: span 2;
    justify-content: flex-start;
    gap: 24px;
    margin: 0 0 0 26px;
  }

  &:nth-child(6) {
    justify-content: flex-end;
  }
`;
const ItemDate = styled.div`
  grid-column: span 2;
  text-align: right;
  margin-right: 26px;
  margin-top: -40px;
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
