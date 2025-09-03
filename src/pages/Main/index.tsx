import SearchBar from '@/components/common/SearchBar';
import { IoIosArrowForward } from 'react-icons/io';
import { Paragraph } from '@/components/common/typography/Paragraph';
import TickerList from '@/components/Ticker/TickerList';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  useGetPopularTickers,
  useGetRisingTickers,
} from '@/api/hooks/useGetTickerList';
import MarketStatusBanner from '@/components/common/Banner/MarketStatusBanner';

export default function MainPage() {
  const navigate = useNavigate();
  const { data: popularData } = useGetPopularTickers();
  const { data: risingData } = useGetRisingTickers();
  return (
    <Wrapper>
      <SearchBar />
      <TickerSection>
        <MarketStatusBanner />
        <TickerTitle>
          <Left>
            <Paragraph size="m" weight="bold">
              한국인이 가장 좋아하는 종목 Top5
            </Paragraph>
            <Paragraph size="xxs" weight="normal" variant="grey">
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
        <TickerList items={popularData?.content.predictionList || []} />
      </TickerSection>
      <TickerSection>
        <TickerTitle>
          <Left>
            <Paragraph size="m" weight="bold">
              가장 많이 오르는 Top5
            </Paragraph>
            <Paragraph size="xxs" weight="normal" variant="grey">
              Finn이 내일 가장 많이 오르는 종목을 예측했어요!
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
        <TickerList items={risingData?.content.predictionList || []} />
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
`;
const TickerSection = styled.div`
  width: 100%;
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
`;

const TickerTitle = styled.div`
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
