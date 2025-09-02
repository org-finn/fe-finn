import styled from 'styled-components';
import NewsItem from './NewsItem';
import { ArticleDataResponse } from '@/types';

export default function NewsList({
  items = [],
}: {
  items: ArticleDataResponse[];
}) {
  return (
    <Wrapper>
      {items.map((item) => (
        <NewsItem key={item.articleId} item={item} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
