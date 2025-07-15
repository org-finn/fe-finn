import styled from 'styled-components';
import NewsItem from './NewsItem';
import { NewsDataResponse } from '@/types';

export default function StockList({
  items = [],
}: {
  items: NewsDataResponse[];
}) {
  return (
    <Wrapper>
      {items.map((item) => (
        <NewsItem key={item.newsId} item={item} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
