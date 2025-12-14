import styled from 'styled-components';
import ArticleItem from './ArticleItem';
import { ArticleDataResponse } from '@/types';

export default function ArticleList({
  items = [],
}: {
  items: ArticleDataResponse[];
}) {
  return (
    <Wrapper>
      {items.map((item) => (
        <ArticleItem key={item.articleId} item={item} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
