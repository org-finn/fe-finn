import TickerList from '@/components/Ticker/TickerList';
import styled from 'styled-components';
import { useGetPopularTickers } from '@/api/hooks/useGetInfiniteTickerList';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Loading from '@/components/common/Layout/Loading';

export default function TickerPage() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { ref, inView } = useInView();
  const {
    data: tickerData,
    isLoading,
    error,
    hasNextPage: hasNext,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPopularTickers();

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
`;

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #e74c3c;
`;
