import styled from 'styled-components';
import { ArticleTitleResponse } from '@/types';
import { Text } from '@/components/common/typography/Text';
import useIsMobile from '@/hooks/useIsMobile';
import { useState, useEffect } from 'react';

type ArticleViewProps = {
  articleTitles?: ArticleTitleResponse[];
};

export default function ArticleView({ articleTitles }: ArticleViewProps) {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!articleTitles || articleTitles.length < 2) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articleTitles.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [articleTitles]);

  if (!articleTitles || articleTitles.length === 0) {
    return null;
  }

  const currentArticle = articleTitles[currentIndex];

  return (
    <ArticleSection key={currentArticle.articleId}>
      <ChipContainer></ChipContainer>
      <ArticleTitle>
        <Text
          size={isMobile ? '12px' : 'xxs'}
          weight="normal"
          variant="#374151"
        >
          📰 {currentArticle.title}
        </Text>
      </ArticleTitle>
    </ArticleSection>
  );
}

const ArticleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  gap: 6px;
  padding: 8px 14px 10px 14px;
  margin: 8px 0;
  background: linear-gradient(145deg, #ffffff, #f5f5f5);
  box-shadow:
    2px 2px 4px rgba(0, 0, 0, 0.1),
    -1px -1px 3px rgba(255, 255, 255, 0.8);
  border-radius: 32px;
  max-width: 360px;
  width: fit-content;
  animation: fadeIn 0.5s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    border-radius: 32px 32px 0 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.4) 0%,
      transparent 100%
    );
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 768px) {
    max-width: 124px;
    padding: 8px 8px 10px 14px;
    margin: 0;
    gap: 4px;
  }
`;

const ChipContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
`;

const ArticleTitle = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  line-height: 1.2;

  @media screen and (max-width: 768px) {
    line-height: 1.1;
    -webkit-line-clamp: 2;
  }
`;
