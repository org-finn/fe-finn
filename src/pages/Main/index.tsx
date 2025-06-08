import SearchBar from '@/components/common/SearchBar';
import { IoIosArrowForward } from 'react-icons/io';
import { Paragraph } from '@/components/common/typography/Paragraph';
import StockList from '@/components/Stock/StockList';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <SearchBar />
      <StockSection>
        <StockTitle>
          <Left>
            <Paragraph size="m" weight="bold">
              가장 많이 오르는 Top5
            </Paragraph>
            <Paragraph size="xxs" weight="normal" variant="grey">
              Finn이 내일 가장 많이 오르는 종목을 예측했어요!
            </Paragraph>
          </Left>
          <MoreBtn
            aria-label="more-stock-btn"
            onClick={() => navigate('/stock')}
          >
            전체 보기
            <IoIosArrowForward />
          </MoreBtn>
        </StockTitle>
        <StockList />
      </StockSection>
      <StockSection>
        <StockTitle>
          <Left>
            <Paragraph size="m" weight="bold">
              하락률 Top5
            </Paragraph>
            <Paragraph size="xxs" weight="normal" variant="grey">
              지금 사세요 어쩌고
            </Paragraph>
          </Left>
          <MoreBtn>
            전체 보기
            <IoIosArrowForward />
          </MoreBtn>
        </StockTitle>
        <StockList />
      </StockSection>
      <BannerSection></BannerSection>
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
const StockSection = styled.div`
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
const BannerSection = styled.div`
  width: 100%;
  border-radius: 10px;
  height: 120px;
  background-color: #f2f2f2;
`;

const StockTitle = styled.div`
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
