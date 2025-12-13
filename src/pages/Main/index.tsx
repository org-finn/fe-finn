import SearchBar from '@/components/common/SearchBar';
import { IoIosArrowForward } from 'react-icons/io';
import { Paragraph } from '@/components/common/typography/Paragraph';
import TickerList from '@/components/Ticker/TickerList';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useGetInfiniteTickerList } from '@/api/hooks/useGetInfiniteTickerList';
import MarketStatusBanner from '@/components/common/Banner/MarketStatusBanner';
import useIsMobile from '@/hooks/useIsMobile';
import { useEffect } from 'react';
import { getABTestVariant } from '@/utils/abTest';
import ExchangeRate from '@/components/common/ExchangeRate';
import ArticleSummary from '@/components/Main/ArticleSummary';

export default function MainPage() {
  const navigate = useNavigate();
  const { data: popularData } = useGetInfiniteTickerList({ sort: 'popular' });
  const { data: volatilityData } = useGetInfiniteTickerList({
    sort: 'volatility',
  });
  const isMobile = useIsMobile();
  const variant = getABTestVariant();

  useEffect(() => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'ticker_item_view',
        ab_test_name: 'ticker_item_ui',
        ab_test_variant: variant,
      });
    }
  }, [variant]);
  return (
    <Wrapper>
      <Header>
        <SearchBar />
        <ExchangeRate />
      </Header>
      <TickerSection>
        <MarketStatusBanner />
        <ArticleSummary />
        <TickerWrapper>
          <TickerTitle>
            <Left>
              <Paragraph size={isMobile ? 'xs' : 'm'} weight="bold">
                한국인이 가장 좋아하는 종목 Top5
              </Paragraph>
              <Paragraph
                size={isMobile ? '12px' : 'xxs'}
                weight="normal"
                variant="grey"
              >
                여러분이 가장 좋아하는 종목을 예측했어요!
              </Paragraph>
            </Left>
            <MoreBtn
              aria-label="more-ticker-btn"
              onClick={() => navigate('/ticker')}
            >
              전체 보기
              <IoIosArrowForward />
            </MoreBtn>
          </TickerTitle>
          <TickerList
            items={popularData?.pages[0].content.predictionList || []}
          />
        </TickerWrapper>
        <TickerWrapper>
          <TickerTitle>
            <Left>
              <Paragraph size={isMobile ? 'xs' : 'm'} weight="bold">
                변동성이 가장 많은 종목 Top5
              </Paragraph>
              <Paragraph
                size={isMobile ? '12px' : 'xxs'}
                weight="normal"
                variant="grey"
              >
                현재 변동성이 가장 많은 종목을 예측했어요!
              </Paragraph>
            </Left>
            <MoreBtn
              aria-label="more-ticker-btn"
              onClick={() => navigate('/ticker')}
            >
              전체 보기
              <IoIosArrowForward />
            </MoreBtn>
          </TickerTitle>
          <TickerList
            items={volatilityData?.pages[0].content.predictionList || []}
          />
        </TickerWrapper>
      </TickerSection>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  padding: 16px 0;

  @media screen and (max-width: 768px) {
    width: 84%;
    gap: 30px;
    padding: 12px 0;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const TickerSection = styled.div`
  width: 100%;
`;

const TickerWrapper = styled.div`
  &:not(:first-child) {
    margin-top: 32px;
  }
`;

const MoreBtn = styled.button`
  border: none;
  background: none;
  border-radius: 10px;
  padding: 8px 10px;
  color: black;
  display: flex;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 768px) {
    padding: 6px 8px;
    font-size: 12px;
    align-items: center;
  }
`;

const TickerTitle = styled.div`
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: end;

  @media screen and (max-width: 768px) {
    padding-bottom: 18px;
  }
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media screen and (max-width: 768px) {
    gap: 4px;
  }
`;
