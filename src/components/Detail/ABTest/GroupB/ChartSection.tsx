import styled, { keyframes } from 'styled-components';
import { Paragraph } from '@/components/common/typography/Paragraph';
import Button from '@/components/common/Button';
import TickerCharts from '@/components/Ticker/TickerCharts';
import RealTimeTickerCharts from '@/components/Ticker/RealTimeTickerCharts';
import { IoMdRefresh } from 'react-icons/io';
import { RealGraphPeriod } from '@/api/hooks/useGetRealGraph';
import {
  GraphData,
  TickerDetailData,
  TickerRealTimeGraphResponse,
} from '@/types';

type ChartSectionProps = {
  isMobile: boolean;
  period: RealGraphPeriod;
  isLiveMode: boolean;
  showRefreshTooltip: boolean;
  realGraphData: GraphData;
  tickerData: TickerDetailData;
  liveChartData: TickerRealTimeGraphResponse[];
  onRefresh: () => void;
  onPeriodChange: (period: RealGraphPeriod) => void;
  onLiveMode: () => void;
};

export default function ChartSection({
  isMobile,
  period,
  isLiveMode,
  showRefreshTooltip,
  realGraphData,
  tickerData,
  liveChartData,
  onRefresh,
  onPeriodChange,
  onLiveMode,
}: ChartSectionProps) {
  return (
    <>
      <StockPriceSection>
        <Paragraph size={isMobile ? 'xs' : 's'} weight="bold">
          실제 주가
        </Paragraph>
      </StockPriceSection>

      <PeriodSelectorContainer>
        <PeriodSelector>
          {(['2W', '1M', '6M', '1Y'] as RealGraphPeriod[]).map((p) => (
            <PeriodButton
              key={p}
              $active={period === p && !isLiveMode}
              onClick={() => onPeriodChange(p)}
            >
              {p}
            </PeriodButton>
          ))}
          <LiveButton $active={isLiveMode} onClick={onLiveMode}>
            live
            <LiveDot />
          </LiveButton>
        </PeriodSelector>
        <RefreshContainer>
          <RefreshButton
            aria-label="차트 새로 고침"
            onClick={onRefresh}
            variant="grey"
            size="small"
          >
            <IoMdRefresh size={isMobile ? 14 : 16} />
          </RefreshButton>
          {showRefreshTooltip && (
            <RefreshTooltip>최신 상태로 업데이트 되었습니다!</RefreshTooltip>
          )}
        </RefreshContainer>
      </PeriodSelectorContainer>

      {isLiveMode ? (
        <RealTimeTickerCharts realTimeData={liveChartData} />
      ) : (
        <TickerCharts
          realData={realGraphData.graphData || []}
          sentiment={tickerData.sentiment ?? 0}
        />
      )}
    </>
  );
}

const StockPriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PeriodSelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PeriodSelector = styled.div`
  display: flex;
  gap: 12px;

  @media screen and (max-width: 768px) {
    gap: 8px;
  }
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

  @media screen and (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
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

  @media screen and (max-width: 768px) {
    padding: 6px 6px 6px 12px;
    font-size: 12px;
  }
`;

const pulse = keyframes`
  0% { transform: scale(0.8); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(0.8); opacity: 1; }
`;

const LiveDot = styled.div`
  width: 6px;
  height: 6px;
  position: relative;
  top: -8px;
  background-color: #e74c3c;
  border-radius: 50%;
  animation: ${pulse} 2s infinite;

  @media screen and (max-width: 768px) {
    width: 4px;
    height: 4px;
    top: -6px;
  }
`;

const RefreshContainer = styled.div`
  position: relative;
  display: flex;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    margin-right: 0;
  }
`;

const RefreshButton = styled(Button)`
  width: 40px;
  height: 34px;

  &:hover {
    svg {
      transform: rotate(60deg);
      transition: transform 0.3s ease;
    }
  }

  @media screen and (max-width: 768px) {
    width: 34px;
    height: 28px;
  }
`;

const tooltipSlideLeft = keyframes`
  0% { opacity: 0; transform: translateX(20px); }
  15% { opacity: 1; transform: translateX(0); }
  85% { opacity: 1; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(-20px); }
`;

const tooltipSlideBottom = keyframes`
  0% { opacity: 0; transform: translateY(-20px); }
  15% { opacity: 1; transform: translateY(0); }
  85% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(20px); }
`;

const RefreshTooltip = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  font-size: 12px;
  color: #333;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  right: 72px;
  top: 0px;
  animation: ${tooltipSlideLeft} 3s ease-in-out forwards;

  @media screen and (max-width: 768px) {
    right: 24px;
    top: 34px;
    animation: ${tooltipSlideBottom} 3s ease-in-out forwards;
  }
`;
