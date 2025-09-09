import { Text } from '@/components/common/typography/Text';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { IoMdRefresh } from 'react-icons/io';
import TickerCharts from '@/components/Ticker/TickerCharts';
import RealTimeTickerCharts from '@/components/Ticker/RealTimeTickerCharts';
import ScoreGaugeChart from '@/components/Detail/ScoreGaugeChart';
import Button from '@/components/common/Button';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetTickerDetail } from '@/api/hooks/useGetTickerDetail';
import { useGetRealGraph, RealGraphPeriod } from '@/api/hooks/useGetRealGraph';
import { useGetRealTimePrice } from '@/api/hooks/useGetRealTimePrice';
import Loading from '@/components/common/Layout/Loading';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Paragraph } from '@/components/common/typography/Paragraph';
import RotationArticleItem from '@/components/Detail/RotationArticleItem';

export default function DetailPage() {
  const { id } = useParams() as { id: string };
  const [period, setPeriod] = useState<RealGraphPeriod>('2W');
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showRefreshTooltip, setShowRefreshTooltip] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const queryClient = useQueryClient();

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
  const {
    data: realTimePriceResponse,
    isLoading: realTimePriceLoading,
    error: realTimePriceError,
  } = useGetRealTimePrice({
    tickerId: id,
  });

  const tickerData = tickerResponse?.content;
  const realGraphData = realGraphResponse?.content;
  const realTimePriceData = realTimePriceResponse?.content;

  const isLoading = tickerLoading || realGraphLoading || realTimePriceLoading;
  const error = tickerError || realGraphError || realTimePriceError;

  useEffect(() => {
    const articleCount = tickerData?.detailData.article?.length || 0;
    if (articleCount > 1) {
      const interval = setInterval(() => {
        setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % articleCount);
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [tickerData?.detailData.article?.length]);

  const handleRefresh = () => {
    if (isLiveMode) {
      queryClient.invalidateQueries({
        queryKey: ['real-time-price', { tickerId: id }],
      });
    } else {
      queryClient.invalidateQueries({
        queryKey: ['real-graph', { period }],
      });
    }
    setShowRefreshTooltip(true);
    setTimeout(() => {
      setShowRefreshTooltip(false);
    }, 3000);
  };

  const formatDate = (priceDate: string) => {
    const [, month, day] = priceDate.split('-');
    return `${Number(month)}월 ${Number(day)}일`;
  };

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
        <CompanyInfo>
          <Text size="l" weight="bold">
            {tickerData.shortCompanyName}
          </Text>
          <Text size="s" weight="normal" variant="grey">
            {tickerData.tickerCode}
          </Text>
        </CompanyInfo>
        <ScoreTitleContainer>
          <Paragraph size="s" weight="bold">
            종목 점수
          </Paragraph>
          <TooltipContainer
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <BsFillQuestionCircleFill size={16} color="#BCC7D9" />
            {showTooltip && (
              <Tooltip>
                수집된 기사의 감정(긍정/부정) 비율에 추세를 반영하여 계산된
                점수입니다.
              </Tooltip>
            )}
          </TooltipContainer>
        </ScoreTitleContainer>
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
              * {formatDate(tickerData.detailData.priceDate)} 기준
            </Text>
          </ItemDate>
        </InfoGrid>
        <ScoreGaugeChart
          value={tickerData.sentimentScore}
          maxValue={100}
          title="점수"
        />
      </TickerInfo>
      <Paragraph size="s" weight="bold">
        실제 주가
      </Paragraph>
      <PeriodSelectorContainer>
        <PeriodSelector>
          {(['2W', '1M', '6M', '1Y'] as RealGraphPeriod[]).map((p) => (
            <PeriodButton
              key={p}
              $active={period === p && !isLiveMode}
              onClick={() => {
                setPeriod(p);
                setIsLiveMode(false);
              }}
            >
              {p}
            </PeriodButton>
          ))}
          <LiveButton $active={isLiveMode} onClick={() => setIsLiveMode(true)}>
            live
            <LiveDot />
          </LiveButton>
        </PeriodSelector>
        <RefreshContainer>
          <RefreshButton onClick={handleRefresh} variant="grey" size="small">
            <IoMdRefresh size={16} />
          </RefreshButton>
          {showRefreshTooltip && (
            <RefreshTooltip>최신 상태로 업데이트 되었습니다!</RefreshTooltip>
          )}
        </RefreshContainer>
      </PeriodSelectorContainer>
      {isLiveMode && realTimePriceData ? (
        <RealTimeTickerCharts
          realTimeData={realTimePriceData.priceDataList || []}
        />
      ) : (
        realGraphData && (
          <TickerCharts
            realData={realGraphData.graphData || []}
            sentiment={tickerData.sentiment ?? 0}
          />
        )
      )}
      {tickerData?.detailData.article &&
        tickerData.detailData.article.length > 0 && (
          <>
            <Paragraph size="s" weight="bold">
              실시간 기사
            </Paragraph>
            <RotationArticleItem
              key={currentNewsIndex}
              item={tickerData.detailData.article[currentNewsIndex]}
            />
          </>
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
  justify-content: space-between;
  align-items: baseline;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-right: 20px;
`;

const ScoreTitleContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-right: 180px;
`;

const TooltipContainer = styled.div`
  position: relative;
  display: flex;
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  font-size: 12px;
  color: #333;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 12px;
    border: 6px solid transparent;
    border-top-color: white;
  }

  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 12px;
    border: 7px solid transparent;
    border-top-color: #ddd;
    margin-top: 1px;
  }
`;
const TickerInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 8px 0px 12px 0px;
`;
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 340px;
  border-radius: 8px;
  gap: 24px;
  padding: 24px 0 0 0;
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

const LiveButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  padding: 8px 8px 8px 12px;
  border: 1px solid ${(props) => (props.$active ? '#47c8d9' : '#ddd')};
  background-color: ${(props) => (props.$active ? '#47c8d9' : 'white')};
  color: ${(props) => (props.$active ? 'white' : '#666')};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 2px;

  &:hover {
    border-color: #47c8d9;
    background-color: ${(props) => (props.$active ? '#47c8d9' : '#f0f9fa')};
  }
`;

const LiveDot = styled.div`
  width: 6px;
  height: 6px;
  position: relative;
  top: -8px;
  background-color: #e74c3c;
  border-radius: 50%;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.8;
    }
    100% {
      transform: scale(0.8);
      opacity: 1;
    }
  }
`;
const PeriodSelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RefreshContainer = styled.div`
  position: relative;
  display: flex;
`;

const RefreshButton = styled(Button)`
  width: 40px;
  height: 34px;
  margin-right: 24px;

  &:hover {
    svg {
      transform: rotate(60deg);
      transition: transform 0.3s ease;
    }
  }
`;

const RefreshTooltip = styled(Tooltip)`
  padding: 10px;
  right: 72px;
  left: auto;
  top: 0px;
  bottom: auto;
  animation: tooltipSlideLeft 3s ease-in-out forwards;

  &::after,
  &::before {
    display: none;
  }

  @keyframes tooltipSlideLeft {
    0% {
      opacity: 0;
      transform: translateX(20px);
    }
    15% {
      opacity: 1;
      transform: translateX(0);
    }
    85% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(-20px);
    }
  }
`;

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #e74c3c;
`;
