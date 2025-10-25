import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import SearchBar from '@/components/common/SearchBar';
import ArticleList from '@/components/Article/ArticleList';
import { useGetInfiniteArticleList } from '@/api/hooks/useGetInfiniteArticleList';
import Loading from '@/components/common/Layout/Loading';
import DropdownFilterBar from '@/components/Article/FilterDrowndown';
import { useGetFilterTickerList } from '@/api/hooks/useGetFilterTickerList';
import Chip from '@/components/Article/FilterChip';
import useIsMobile from '@/hooks/useIsMobile';

type NewsSentiment = 'positive' | 'negative';
type NewsSort = 'recent';

export default function NewsBoardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const getInitialSentiment = useCallback((): NewsSentiment | null => {
    const searchParams = new URLSearchParams(location.search);
    return (searchParams.get('sentiment') as NewsSentiment) || null;
  }, [location.search]);

  const getTickerCodes = useCallback((): string[] => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.getAll('tickerCode');
  }, [location.search]);

  const [sentiment, setSentiment] = useState<NewsSentiment | null>(
    getInitialSentiment()
  );
  const [sort] = useState<NewsSort>('recent');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { ref, inView } = useInView();
  const currentTickerCodes = getTickerCodes();

  const {
    data: articleList,
    isLoading,
    error,
    hasNextPage: hasNext,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetInfiniteArticleList({
    tickerCode: currentTickerCodes.length > 0 ? currentTickerCodes : undefined,
    sentiment: sentiment || undefined,
    sort,
  });

  const { data: filterTickerData } = useGetFilterTickerList();

  const handleTickerChange = useCallback(
    (selectedTickerId: string) => {
      const searchParams = new URLSearchParams(location.search);
      const existingCodes = searchParams.getAll('tickerCode');

      searchParams.delete('tickerCode');

      let newCodes: string[];
      if (existingCodes.includes(selectedTickerId)) {
        newCodes = existingCodes.filter((code) => code !== selectedTickerId);
      } else {
        newCodes = [...existingCodes, selectedTickerId];
      }

      newCodes.forEach((code) => {
        searchParams.append('tickerCode', code);
      });

      navigate(`${location.pathname}?${searchParams.toString()}`);
    },
    [location, navigate]
  );

  const dropdownFilterTypeList = useMemo(() => {
    return [
      {
        type: 'dropdown' as const,
        id: 'ticker-filter',
        props: {
          options:
            filterTickerData?.content?.tickerList.map((ticker) => ({
              label: ticker.shortCompanyName,
              id: ticker.tickerCode,
            })) || [],
          onChange: (value: { id: string }) => handleTickerChange(value.id),
          isMobileOpen: false,
          placeholder: isMobile ? '필터' : '종목 선택',
          width: 120,
          selectedOptions: currentTickerCodes,
        },
      },
    ];
  }, [filterTickerData, handleTickerChange, currentTickerCodes, isMobile]);

  const handleFilterChange = (newFilter: NewsSentiment | null) => {
    const searchParams = new URLSearchParams(location.search);
    if (newFilter) {
      searchParams.set('sentiment', newFilter);
    } else {
      searchParams.delete('sentiment');
    }
    navigate(`${location.pathname}?${searchParams.toString()}`);
    setSentiment(newFilter);
  };

  useEffect(() => {
    if (articleList?.pages && articleList.pages.length > 0) {
      setIsInitialLoad(false);
    }
  }, [articleList?.pages]);

  useEffect(() => {
    if (inView && hasNext && !isFetchingNextPage && !isInitialLoad) {
      fetchNextPage();
    }
  }, [inView, hasNext, isFetchingNextPage, fetchNextPage, isInitialLoad]);

  useEffect(() => {
    setSentiment(getInitialSentiment());
  }, [getInitialSentiment, location.search]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return (
      <ErrorMessage>데이터를 불러오는 중 오류가 발생했습니다.</ErrorMessage>
    );
  }
  if (!articleList?.pages || articleList.pages.length === 0) {
    return <ErrorMessage>뉴스 정보를 찾을 수 없습니다.</ErrorMessage>;
  }

  const allArticles = articleList.pages.flatMap(
    (page) => page.content.articleList
  );

  return (
    <Wrapper>
      <SearchBar />

      <FilterContainer>
        <FilterTabsGroup>
          <FilterTab
            $active={sentiment === null}
            onClick={() => handleFilterChange(null)}
          >
            전체
          </FilterTab>
          <FilterTab
            $active={sentiment === 'positive'}
            onClick={() => handleFilterChange('positive')}
          >
            긍정
          </FilterTab>
          <FilterTab
            $active={sentiment === 'negative'}
            onClick={() => handleFilterChange('negative')}
          >
            부정
          </FilterTab>
        </FilterTabsGroup>
        <DropdownFilterBar items={dropdownFilterTypeList} />
      </FilterContainer>

      <ChipContainer>
        <Chip
          selectedTickers={
            filterTickerData?.content?.tickerList.filter((ticker) =>
              currentTickerCodes.includes(ticker.tickerCode)
            ) || []
          }
          onClearTicker={(tickerCode) => {
            const searchParams = new URLSearchParams(location.search);
            const existingCodes = searchParams.getAll('tickerCode');
            const newCodes = existingCodes.filter(
              (code) => code !== tickerCode
            );

            searchParams.delete('tickerCode');
            newCodes.forEach((code) => {
              searchParams.append('tickerCode', code);
            });
            navigate(`${location.pathname}?${searchParams.toString()}`);
          }}
        />
      </ChipContainer>

      <ArticleList items={allArticles} />
      <div ref={ref} style={{ height: '50px' }} />
      {isFetchingNextPage && <Loading />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 16px 0;

  @media screen and (max-width: 768px) {
    width: 84%;
    gap: 40px;
    padding: 12px 0;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -30px;

  @media screen and (max-width: 768px) {
    align-items: end;
    margin-top: -32px;
    margin-bottom: -10px;
  }
`;

const FilterTabsGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const FilterTab = styled.button<{ $active: boolean }>`
  padding: 12px 24px;
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

const ChipContainer = styled.div`
  display: flex;
  height: 10px;
  align-items: center;
  margin: -22px 0;

  @media screen and (max-width: 768px) {
    margin: -6px 0 -16px 0;
  }
`;

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #e74c3c;
`;
