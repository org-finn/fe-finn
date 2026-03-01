import { PiHeartFill, PiHeartLight } from 'react-icons/pi';

import styled from 'styled-components';

import { useCallback, useState } from 'react';
import { Text } from '@/components/common/typography/Text';
import { JoinTickerData } from '@/types';
import useAuth from '@/hooks/useAuth';
import useIsMobile from '@/hooks/useIsMobile';
import useGetVariant from '@/hooks/useGetVariant';
import useGetSignSymbol from '@/hooks/useGetSignSymbol';
import GraphView from '@/components/Ticker/ABTest/GraphView';
import LoginModal from '@/components/common/Modal/LoginModal';
import { useLocation } from 'react-router-dom';

interface TickerCardProps extends JoinTickerData {
  onToggleLike: (tickerId: string, isFavorite: boolean) => void;
  isSelected: boolean;
}

export default function TickerCard({
  tickerCode,
  shortCompanyName,
  predictionStrategy,
  sentiment,
  graphData,
  onToggleLike,
  isSelected = false,
}: TickerCardProps) {
  const isMobile = useIsMobile();
  const getVariant = useGetVariant(sentiment);
  const getSignSymbol = useGetSignSymbol(sentiment);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLikeClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.preventDefault();
      if (!isAuthenticated) {
        setShowLoginModal(true);
        return;
      }
      onToggleLike(tickerCode, !isSelected);
    },
    [tickerCode, isSelected, onToggleLike, isAuthenticated]
  );

  return (
    <>
      <Wrapper>
        <ImageContainer>
          <LikeIcon onClick={handleLikeClick}>
            {isSelected ? (
              <PiHeartFill color="#fe7373" size={32} />
            ) : (
              <PiHeartLight
                size={32}
                color="white"
                style={{
                  filter: 'drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.3))',
                }}
              />
            )}
          </LikeIcon>
          <GraphWrapper>
            <GraphView graphData={graphData} />
          </GraphWrapper>
        </ImageContainer>
        <InfoContainer>
          <TickerInfo>
            <Text size="s" weight="bold">
              {tickerCode}
            </Text>
            <Text size="xxs" weight="normal" variant="grey">
              {shortCompanyName}
            </Text>
          </TickerInfo>
          <SignalInfo>
            {getSignSymbol && (
              <span
                style={{
                  marginRight: '4px',
                  fontSize: isMobile ? '12px' : '14px',
                }}
              >
                {getSignSymbol}
              </span>
            )}
            <Text
              size={isMobile ? 'xxs' : 'xs'}
              weight="bold"
              variant={getVariant}
            >
              {predictionStrategy} 신호
            </Text>
          </SignalInfo>
        </InfoContainer>
      </Wrapper>
      {showLoginModal && (
        <LoginModal
          immediateOpen={true}
          currentPath={location.pathname}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
}

const Wrapper = styled.div`
  width: 154px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  gap: 4px;
  border-radius: 8px;

  background-color: #f7faff;
  padding: 12px;

  @media screen and (max-width: 768px) {
    height: 100%;
    aspect-ratio: 1.2 / 2;
    width: auto;
  }
`;

const ImageContainer = styled.div`
  width: 150px;
  aspect-ratio: 3 / 2;
  position: relative;
  border-radius: 6px;
  overflow: hidden;

  margin-bottom: 4px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const InfoContainer = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 0;
  gap: 10px;
`;

const TickerInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
`;

const SignalInfo = styled.div`
  display: flex;
  align-items: center;
`;

const LikeIcon = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 2px;
  top: 4px;
  z-index: 100;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    top: 8px;
    right: 6px;
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const GraphWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  > div {
    padding: 0 !important;
    height: 100% !important;
  }
`;
