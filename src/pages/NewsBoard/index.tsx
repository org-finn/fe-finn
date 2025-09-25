import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import SearchBar from '@/components/common/SearchBar';
import ArticleList from '@/components/Article/ArticleList';
import { useGetInfiniteArticleList } from '@/api/hooks/useGetInfiniteArticleList';
import Loading from '@/components/common/Layout/Loading';

type NewsFilter = 'all' | 'positive' | 'negative';
type NewsSort = 'recent';

export default function NewsBoardPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialFilter = useCallback((): NewsFilter => {
    const searchParams = new URLSearchParams(location.search);
    return (searchParams.get('filter') as NewsFilter) || 'all';
  }, [location.search]);

  const getTickerId = useCallback((): string | undefined => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('tickerId') || undefined;
  }, [location.search]);

  const [filter, setFilter] = useState<NewsFilter>(getInitialFilter());
  const [sort] = useState<NewsSort>('recent');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { ref, inView } = useInView();
  const tickerId = getTickerId();

  const {
    data: articleList,
    isLoading,
    error,
    hasNextPage: hasNext,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetInfiniteArticleList({ filter, sort, tickerId });

  const handleFilterChange = (newFilter: NewsFilter) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('filter', newFilter);
    navigate(`${location.pathname}?${searchParams.toString()}`);
    setFilter(newFilter);
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
        <FilterTab
          $active={filter === 'all'}
          onClick={() => handleFilterChange('all')}
        >
          전체
        </FilterTab>
        <FilterTab
          $active={filter === 'positive'}
          onClick={() => handleFilterChange('positive')}
        >
          긍정
        </FilterTab>
        <FilterTab
          $active={filter === 'negative'}
          onClick={() => handleFilterChange('negative')}
        >
          부정
        </FilterTab>
      </FilterContainer>

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
  gap: 20px;
  margin-top: -30px;

  @media screen and (max-width: 768px) {
    margin-top: -32px;
    margin-bottom: -10px;
  }
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

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #e74c3c;
`;
