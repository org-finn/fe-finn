import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Paragraph } from '@/components/common/typography/Paragraph';
import { Text } from '@/components/common/typography/Text';
import TickerCard from '@/components/common/TickerCard';
import Pagination from '@/components/common/Pagination';
import NoItem from '@/components/common/Layout/NoItem';
import Button from '@/components/common/Button';
import { useGetJoinTickerList } from '@/api/hooks/useGetJoinTickerList';
import { usePutFavoriteTickers } from '@/api/hooks/usePutFavoriteTickers';
import useIsMobile from '@/hooks/useIsMobile';
import SearchBar from '@/components/common/SearchBar';

export default function JoinPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selectedTickers, setSelectedTickers] = useState<Set<string>>(
    new Set()
  );
  const { mutateAsync: postMultipleLikes } = usePutFavoriteTickers();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResultCodes, setSearchResultCodes] = useState<string[] | null>(
    null
  );
  const { data } = useGetJoinTickerList(currentPage - 1);
  const tickerList = data?.content.tickers || [];
  const filteredTickers =
    searchResultCodes !== null
      ? tickerList.filter((ticker) =>
          searchResultCodes.includes(ticker.tickerCode)
        )
      : tickerList;
  const itemSize = isMobile ? 8 : 9;
  const displayTickers = filteredTickers.slice(0, itemSize);
  const totalPages =
    searchResultCodes !== null
      ? Math.ceil(filteredTickers.length / itemSize) || 1
      : 4;

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const handleSkip = () => {
    navigate('/');
  };

  const handleStart = async () => {
    try {
      if (selectedTickers.size > 0) {
        await postMultipleLikes({
          tickers: [...selectedTickers],
        });
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
      alert('관심 종목 저장에 실패했습니다. 다시 시도해주세요!');
    } finally {
      navigate('/');
    }
  };

  const handleToggleLike = (tickerCode: string, isFavorite: boolean) => {
    setSelectedTickers((prev) => {
      const newSet = new Set(prev);
      if (isFavorite) {
        newSet.add(tickerCode);
      } else {
        newSet.delete(tickerCode);
      }
      return newSet;
    });
  };

  const buttonStyle = {
    width: isMobile ? '140px' : '170px',
    height: isMobile ? '40px' : '46px',
    fontSize: isMobile ? '16px' : '18px',
  };

  return (
    <Wrapper>
      <Paragraph size="m" weight="bold">
        관심 있는
        <Text size="l" weight="bold" variant="blue">
          종목
        </Text>
        을 선택하세요!
      </Paragraph>
      <SearchBar onSearchResult={setSearchResultCodes} />
      {filteredTickers.length === 0 ? (
        <NoItem
          message="종목 정보가 없어요!"
          height={300}
          alignItems="center"
        />
      ) : (
        <CardContainer>
          {displayTickers.map((ticker) => (
            <TickerCard
              key={ticker.tickerCode}
              tickerCode={ticker.tickerCode}
              shortCompanyName={ticker.shortCompanyName}
              predictionStrategy={ticker.predictionStrategy}
              sentiment={ticker.sentiment}
              graphData={ticker.graphData}
              onToggleLike={handleToggleLike}
              isSelected={selectedTickers.has(ticker.tickerCode)}
            />
          ))}
        </CardContainer>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <ButtonWrapper>
        <Button
          aria-label="건너뛰기"
          variant="blackOutline"
          style={buttonStyle}
          onClick={handleSkip}
        >
          건너뛰기
        </Button>
        <Button
          aria-label="시작하기"
          variant="mint"
          style={buttonStyle}
          onClick={handleStart}
        >
          시작하기
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 20px;
  margin-top: 10px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const ButtonWrapper = styled.div`
  width: 630px;
  display: flex;
  justify-content: space-between;
  gap: 180px;
  margin-bottom: 30px;

  @media screen and (max-width: 768px) {
    width: 90%;
    margin-bottom: 20px;
  }
`;
