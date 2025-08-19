import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '@/components/common/SearchBar';
import NewsList from '@/components/News/NewsList';
import { useGetNewsList } from '@/api/hooks/useGetNewsList';
import Loading from '@/components/common/Layout/Loading';

type NewsOption = 'all' | 'positive' | 'negative';
type NewsSort = 'recent';

export default function NewsBoardPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialOption = useCallback((): NewsOption => {
    const searchParams = new URLSearchParams(location.search);
    return (searchParams.get('option') as NewsOption) || 'all';
  }, [location.search]);

  const [option, setOption] = useState<NewsOption>(getInitialOption());
  const [sort] = useState<NewsSort>('recent');
  const [size] = useState(10);

  const {
    data: newsList,
    isLoading,
    error,
  } = useGetNewsList({ option, sort, size });

  const handleOptionChange = (newOption: NewsOption) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('option', newOption);
    navigate(`${location.pathname}?${searchParams.toString()}`);
    setOption(newOption);
  };

  useEffect(() => {
    setOption(getInitialOption());
  }, [getInitialOption]);

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
        <OptionTab
          $active={option === 'all'}
          onClick={() => handleOptionChange('all')}
        >
          전체
        </OptionTab>
        <OptionTab
          $active={option === 'positive'}
          onClick={() => handleOptionChange('positive')}
        >
          긍정
        </OptionTab>
        <OptionTab
          $active={option === 'negative'}
          onClick={() => handleOptionChange('negative')}
        >
          부정
        </OptionTab>
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

const OptionTab = styled.button<{ $active: boolean }>`
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
