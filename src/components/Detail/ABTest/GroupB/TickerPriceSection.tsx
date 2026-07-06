import { useState } from 'react';
import styled from 'styled-components';
import { Text } from '@/components/common/typography/Text';
import { Paragraph } from '@/components/common/typography/Paragraph';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import ScoreGaugeChart from './ScoreGaugeChart';
import { TickerDetailData } from '@/types';

type TTickerPriceSectionProps = {
  tickerData: TickerDetailData;
  isMobile: boolean;
};

const formatDate = (priceDate: string) => {
  const [, month, day] = priceDate.split('-');
  return `${Number(month)}월 ${Number(day)}일`;
};

export default function TickerPriceSection({
  tickerData,
  isMobile,
}: TTickerPriceSectionProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { detailData, sentimentScore, predictionStrategy } = tickerData;

  return (
    <>
      <TickerInfo>
        <InfoGrid>
          <InfoItem>
            <Text size={isMobile ? 'xxs' : 'xs'} weight="normal">
              시가
            </Text>
            <Text size={isMobile ? 'xxs' : 'xs'} weight="normal" variant="grey">
              $ {detailData.open}
            </Text>
          </InfoItem>

          <InfoItem>
            <Text size={isMobile ? 'xxs' : 'xs'} weight="normal">
              종가
            </Text>
            <Text size={isMobile ? 'xxs' : 'xs'} weight="normal" variant="grey">
              $ {detailData.close}
            </Text>
          </InfoItem>

          <InfoItem>
            <Text size={isMobile ? 'xxs' : 'xs'} weight="normal">
              고가
            </Text>
            <Text size={isMobile ? 'xxs' : 'xs'} weight="normal" variant="grey">
              $ {detailData.high}
            </Text>
          </InfoItem>

          <InfoItem>
            <Text size={isMobile ? 'xxs' : 'xs'} weight="normal">
              저가
            </Text>
            <Text size={isMobile ? 'xxs' : 'xs'} weight="normal" variant="grey">
              $ {detailData.low}
            </Text>
          </InfoItem>

          <InfoItem>
            <Text size={isMobile ? 'xxs' : 'xs'} weight="normal">
              거래량
            </Text>
            <Text size={isMobile ? 'xxs' : 'xs'} weight="normal" variant="grey">
              {detailData.volume.toLocaleString()}주
            </Text>
          </InfoItem>
          <ItemDate>
            <Text size="xxs" weight="normal" variant="grey">
              * {formatDate(detailData.priceDate)} 기준
            </Text>
          </ItemDate>
        </InfoGrid>
        {!isMobile && (
          <ScoreGaugeChart
            value={sentimentScore}
            maxValue={100}
            title="점수"
            predictionStrategy={predictionStrategy}
          />
        )}
      </TickerInfo>

      {/* 모바일: 점수 섹션을 InfoGrid 아래에 표시 */}
      {isMobile && (
        <>
          <ScoreTitleContainer>
            <Paragraph size="xs" weight="bold">
              종목 점수
            </Paragraph>
            <TooltipContainer
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <BsFillQuestionCircleFill size={14} color="#BCC7D9" />
              {showTooltip && (
                <Tooltip>
                  수집된 기사의 감정(긍정/부정) 비율에
                  <br /> 추세를 반영하여 계산된 점수입니다.
                </Tooltip>
              )}
            </TooltipContainer>
          </ScoreTitleContainer>
          <ScoreGaugeChart
            value={sentimentScore}
            maxValue={100}
            title="점수"
            predictionStrategy={predictionStrategy}
          />
        </>
      )}
    </>
  );
}

const TickerInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 12px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding-bottom: 10px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 350px;
  border-radius: 8px;
  gap: 24px;
  padding: 24px 0 0 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 768px) {
    width: 90%;
    max-width: 300px;
    gap: 20px;
    padding: 16px 0 0 0;
  }
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

  @media screen and (max-width: 768px) {
    margin: 0px 20px;

    &:nth-child(5) {
      gap: 16px;
      margin: 0 0 0 20px;
    }
  }
`;

const ItemDate = styled.div`
  grid-column: span 2;
  text-align: right;
  margin-right: 26px;
  margin-top: -40px;

  @media screen and (max-width: 768px) {
    margin-right: 20px;
    margin-top: -32px;
  }
`;

const ScoreTitleContainer = styled.div`
  display: flex;
  gap: 4px;
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
  line-height: 1.4;

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
