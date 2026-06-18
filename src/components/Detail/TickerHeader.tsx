import { useState } from 'react';
import styled from 'styled-components';
import { Text } from '@/components/common/typography/Text';
import { Paragraph } from '@/components/common/typography/Paragraph';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { PiHeartFill, PiHeartLight } from 'react-icons/pi';
import { TickerDetailData } from '@/types';

type TickerHeaderProps = {
  tickerData: TickerDetailData;
  isMobile: boolean;
  isFavorite: boolean;
  onLikeClick: (event: React.MouseEvent) => void;
};

export default function TickerHeader({
  tickerData,
  isMobile,
  isFavorite,
  onLikeClick,
}: TickerHeaderProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <TickerTitle>
      <CompanyInfo>
        <Text size={isMobile ? 'm' : 'l'} weight="bold">
          {tickerData.shortCompanyName}
        </Text>
        <Text size={isMobile ? 'xs' : 's'} weight="normal" variant="grey">
          {tickerData.tickerCode}
        </Text>
        <LikeIconWrapper onClick={onLikeClick}>
          {isFavorite ? (
            <PiHeartFill color="#fe7373" size={isMobile ? 18 : 22} />
          ) : (
            <PiHeartLight size={isMobile ? 18 : 22} color="#ccc" />
          )}
        </LikeIconWrapper>
      </CompanyInfo>
      {!isMobile && (
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
      )}
    </TickerTitle>
  );
}

const TickerTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-right: 20px;

  @media screen and (max-width: 768px) {
    gap: 6px;
    margin-right: 2px;
  }
`;

const LikeIconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 1;
`;

export const ScoreTitleContainer = styled.div`
  display: flex;
  gap: 6px;
  width: 204px;

  @media screen and (max-width: 768px) {
    width: auto;
    gap: 4px;
  }
`;

const TooltipContainer = styled.div`
  position: relative;
  display: flex;
`;

export const Tooltip = styled.div`
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

  @media screen and (max-width: 768px) {
    line-height: 1.4;
  }
`;
