import TickerList from '@/components/Ticker/TickerList';
import styled from 'styled-components';
import { useGetInfiniteTickerList } from '@/api/hooks/useGetInfiniteTickerList';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Loading from '@/components/common/Layout/Loading';
import SearchBar from '@/components/common/SearchBar';

type TickerFilter = 'popular' | 'upward' | 'downward';

export default function TickerPage() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const location = useLocation();

  const getInitialFilter = useCallback((): TickerFilter => {
    const searchParams = new URLSearchParams(location.search);
    return (searchParams.get('filter') as TickerFilter) || 'popular';
  }, [location.search]);

  const [filter, setFilter] = useState<TickerFilter>(getInitialFilter());
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const {
    data: tickerData,
    isLoading,
    error,
    hasNextPage: hasNext,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetInfiniteTickerList({ sort: filter });

  const handleFilterChange = (newFilter: TickerFilter) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('filter', newFilter);
    navigate(`${location.pathname}?${searchParams.toString()}`);
    setFilter(newFilter);
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

  useEffect(() => {
    setFilter(getInitialFilter());
  }, [getInitialFilter]);

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
      <FilterContainer>
        <FilterTab
          $active={filter === 'popular'}
          onClick={() => handleFilterChange('popular')}
        >
          인기순
        </FilterTab>
        <FilterTab
          $active={filter === 'upward'}
          onClick={() => handleFilterChange('upward')}
        >
          점수▲
        </FilterTab>
        <FilterTab
          $active={filter === 'downward'}
          onClick={() => handleFilterChange('downward')}
        >
          점수▼
        </FilterTab>
      </FilterContainer>
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

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: -16px;

  @media screen and (max-width: 768px) {
    margin-top: -32px;
    margin-bottom: -10px;
  }
`;

const FilterTab = styled.button<{ $active: boolean }>`
  padding: 12px 18px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-bottom: 3px solid ${(props) => (props.$active ? '#2d70d3' : '#8c8c8c')};
  background: none;
  cursor: pointer;
  color: ${(props) => (props.$active ? '#2d70d3' : '#8c8c8c')};

  @media screen and (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #e74c3c;
`;
