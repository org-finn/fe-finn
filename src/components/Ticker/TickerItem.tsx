import styled from 'styled-components';
import { Text } from '../common/typography/Text';
import { PredictionDataResponse } from '@/types';
import { Link } from 'react-router-dom';
import useGetVariant from '@/hooks/useGetVariant';
import useGetSignSymbol from '@/hooks/useGetSignSymbol';
import useIsMobile from '@/hooks/useIsMobile';
import GraphView from './ABTest/GraphView';
import { useCallback, useState } from 'react';
import { PiHeartFill, PiHeartLight } from 'react-icons/pi';
import useAuth from '@/hooks/useAuth';
import { usePutFavoriteTicker } from '@/api/hooks/usePutFavoriteTicker';
import LoginModal from '@/components/common/Modal/LoginModal';
import { useLocation } from 'react-router-dom';

export default function TickerItem({ item }: { item: PredictionDataResponse }) {
  const isMobile = useIsMobile();
  const getVariant = useGetVariant(item.sentiment);
  const getSignSymbol = useGetSignSymbol(item.sentiment);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(item.isFavorite ?? false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { mutate: putFavoriteTicker } = usePutFavoriteTicker();

  const handleLikeClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      if (!isAuthenticated) {
        setShowLoginModal(true);
        return;
      }
      const nextFavorite = !isFavorite;
      setIsFavorite(nextFavorite);
      putFavoriteTicker({
        tickerCode: item.tickerCode,
        mode: nextFavorite ? 'on' : 'off',
      });
    },
    [isFavorite, isAuthenticated, item.tickerCode, putFavoriteTicker]
  );

  return (
    <>
      <Wrapper to={`/ticker/${item.tickerId}`}>
        <LeftSection>
          <TickerInfo>
            <Text size={isMobile ? 's' : 'm'} weight="bold">
              {item.tickerCode}
            </Text>
            <Text size={isMobile ? 'xxs' : 'xs'} weight="normal" variant="grey">
              {item.shortCompanyName}
            </Text>
            <LikeIconWrapper onClick={handleLikeClick}>
              {isFavorite ? (
                <PiHeartFill color="#fe7373" size={isMobile ? 18 : 22} />
              ) : (
                <PiHeartLight size={isMobile ? 18 : 22} color="#ccc" />
              )}
            </LikeIconWrapper>
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
              {item.predictionStrategy} 신호
            </Text>
          </SignalInfo>
        </LeftSection>

        <PriceInfo>
          <GraphView graphData={item.graphData} />
        </PriceInfo>
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

const Wrapper = styled(Link)`
  display: flex;
  justify-content: space-between;
  padding: 14px 32px;
  color: black;
  background-color: #f7faff;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: #f4f7fc;
  }

  @media screen and (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  @media screen and (max-width: 768px) {
    gap: 12px;
  }
`;

const TickerInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 8px;
`;

const SignalInfo = styled.div`
  display: flex;
  align-items: center;
`;

const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  flex: 1;
`;

const LikeIconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 1;
`;
