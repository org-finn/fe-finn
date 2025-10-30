import TickerList from '@/components/Ticker/TickerList';
import styled from 'styled-components';
import { useGetInfiniteTickerList } from '@/api/hooks/useGetInfiniteTickerList';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Loading from '@/components/common/Layout/Loading';
import SearchBar from '@/components/common/SearchBar';
import Button from '@/components/common/Button';
import { IoIosArrowDown } from 'react-icons/io';

export default function TickerPage() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  const getInitialSortOption = (): string => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('sort') || 'popular';
  };

  const [sortOption, setSortOption] = useState(getInitialSortOption());
  const [showSortOptions, setShowSortOptions] = useState(false);

  const handleSortChange = (option: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('sort', option);
    navigate(`${location.pathname}?${searchParams.toString()}`);
    setSortOption(option);
    setShowSortOptions(false);
  };

  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const {
    data: tickerData,
    isLoading,
    error,
    hasNextPage: hasNext,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetInfiniteTickerList({ sort: sortOption });
  const sortLabel: Record<string, string> = {
    popular: '인기순',
    upward: '점수 높은순',
    downward: '점수 낮은순',
    volatility: '변동성순',
  };

  useEffect(() => {
    if (tickerData?.pages && tickerData.pages.length > 0) {
      setIsInitialLoad(false);
    }
  }, [tickerData?.pages]);

  useEffect(() => {
    if (inView && hasNext && !isFetchingNextPage && !isInitialLoad) {
      fetchNextPage();
    }
  }, [inView, hasNext, isFetchingNextPage, fetchNextPage, isInitialLoad]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return (
      <ErrorMessage>데이터를 불러오는 중 오류가 발생했습니다.</ErrorMessage>
    );
  }
  if (!tickerData || tickerData.pages.length === 0) {
    return <ErrorMessage>종목 정보를 찾을 수 없습니다.</ErrorMessage>;
  }

  const allTickers =
    tickerData?.pages.flatMap((page) => page.content.predictionList) || [];

  return (
    <Wrapper>
      <SearchBar />
      <SortSection ref={dropdownRef}>
        <StyledButton
          aria-label="티커 정렬"
          variant="white"
          size="small"
          onClick={() => setShowSortOptions(!showSortOptions)}
        >
          <span>{sortLabel[sortOption]}</span>
          <IoIosArrowDown size={16} />
        </StyledButton>
        {showSortOptions && (
          <SortDropdown>
            <SortItem onClick={() => handleSortChange('popular')}>
              인기순 {sortOption === 'popular'}
            </SortItem>
            <SortItem onClick={() => handleSortChange('upward')}>
              점수 높은순 {sortOption === 'upward'}
            </SortItem>
            <SortItem onClick={() => handleSortChange('downward')}>
              점수 낮은순 {sortOption === 'downward'}
            </SortItem>
            <SortItem onClick={() => handleSortChange('volatility')}>
              변동성순 {sortOption === 'volatility'}
            </SortItem>
          </SortDropdown>
        )}
      </SortSection>
      <TickerList items={allTickers} />
      <div ref={ref} style={{ height: '50px' }} />
      {isFetchingNextPage && <Loading />}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  gap: 36px;

  @media screen and (max-width: 768px) {
    width: 84%;
    gap: 30px;
    padding: 12px 0;
  }
`;

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #e74c3c;
`;

const SortSection = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin: -10px 0;

  @media screen and (max-width: 768px) {
  }
`;

const StyledButton = styled(Button)`
  justify-content: space-between;
  gap: 8px;
  padding: 10px 12px;
  width: 120px;
  cursor: pointer;
  font-size: 16px;
  margin-left: auto;
  color: #333333;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #a5a5a5;
  height: 40px;

  &:hover {
    background-color: #f2f2f2;
  }

  @media screen and (max-width: 768px) {
    width: 110px;
    font-size: 14px;
    padding: 8px 10px;
    height: 36px;
  }
`;

const SortDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 101;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.15);
  width: 120px;
  margin-top: 4px;
  color: #333333;

  @media screen and (max-width: 768px) {
    width: 110px;
    border-radius: 4px;
    margin-top: 2px;
  }
`;

const SortItem = styled.div`
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #f2f2f2;
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
    padding: 10px 12px;

    &:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    &:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
`;
