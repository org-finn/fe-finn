import styled from 'styled-components';
import { ArticleTitleResponse } from '@/types';

type ArticleViewProps = {
  articleTitles?: ArticleTitleResponse[];
};

export default function ArticleView({ articleTitles }: ArticleViewProps) {
  if (!articleTitles || articleTitles.length === 0) {
    return null;
  }

  return <ArticleSection>{/* article */}</ArticleSection>;
}

const ArticleSection = styled.div`
  display: flex;
`;
