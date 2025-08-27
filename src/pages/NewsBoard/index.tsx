import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '@/components/common/SearchBar';
import NewsList from '@/components/News/NewsList';
import { useGetArticleList } from '@/api/hooks/useGetArticleList';
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

  const [filter, setFilter] = useState<NewsFilter>(getInitialFilter());
  const [sort] = useState<NewsSort>('recent');
  const [page] = useState<number>(1);

  const {
    data: newsList,
    isLoading,
    error,
  } = useGetArticleList({ filter, sort, page });

  const handleFilterChange = (newFilter: NewsFilter) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('filter', newFilter);
    navigate(`${location.pathname}?${searchParams.toString()}`);
    setFilter(newFilter);
  };

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
  if (!newsList?.content.newsList) {
    return <ErrorMessage>뉴스 정보를 찾을 수 없습니다.</ErrorMessage>;
  }

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

      <NewsList items={newsList.content.newsList} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 16px 0;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: -30px;
`;

const FilterTab = styled.button<{ $active: boolean }>`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-bottom: 3px solid ${(props) => (props.$active ? '#47c8d9' : '#8c8c8c')};
  background: none;
  cursor: pointer;
  color: ${(props) => (props.$active ? '#47c8d9' : '#8c8c8c')};
`;

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #e74c3c;
`;
