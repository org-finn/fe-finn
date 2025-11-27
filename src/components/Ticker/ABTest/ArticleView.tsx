import styled from 'styled-components';
import { ArticleTitleResponse } from '@/types';
import { Text } from '@/components/common/typography/Text';
import useIsMobile from '@/hooks/useIsMobile';
import { useState, useEffect } from 'react';
import useGetVariant from '@/hooks/useGetVariant';
import useGetSignSymbol from '@/hooks/useGetSignSymbol';

type ArticleViewProps = {
  predictionStrategy: string;
  sentiment: number;
  articleTitles?: ArticleTitleResponse[];
};

export default function ArticleView({
  predictionStrategy,
  sentiment,
  articleTitles,
}: ArticleViewProps) {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const getVariant = useGetVariant(sentiment);
  const getSignSymbol = useGetSignSymbol(sentiment);

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
      <ChipContainer>
        {isMobile ? (
          <SignalChip $variant={getVariant}>
            {getSignSymbol && (
              <span style={{ fontSize: '10px' }}>{getSignSymbol}</span>
            )}
            <Text size="xxs" weight="bold" variant={getVariant}>
              {predictionStrategy} 신호
            </Text>
          </SignalChip>
        ) : (
          <RealtimeChip>
            <Text size="xxs" weight="normal" variant="#374151">
              실시간 기사
            </Text>
          </RealtimeChip>
        )}
      </ChipContainer>
      <ArticleTitle>
        <Text size={isMobile ? 'xxs' : 'xs'} weight="normal" variant="#374151">
          {currentArticle.title}
        </Text>
      </ArticleTitle>
    </ArticleSection>
  );
}

const ArticleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 14px;
  background-color: white;
  border-radius: 8px;
  width: 360px;
  animation: fadeIn 0.5s ease-in-out;

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
    width: 180px;
    padding: 8px 10px;
    gap: 4px;
  }
`;

const ChipContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
`;

const RealtimeChip = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px 2px 8px;
  margin-top: -2px;
  height: 16px;
  border-radius: 18px;
  background-color: #e5e7eb;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    padding: 2px 6px 0px 6px;
    height: 14px;
  }
`;

const SignalChip = styled.div<{ $variant: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px 2px 8px;
  margin-top: -2px;
  height: 16px;
  border-radius: 18px;
  background-color: ${(props) =>
    props.$variant === 'red'
      ? '#ffecec'
      : props.$variant === 'blue'
        ? '#e6f0ff'
        : '#f0f0f0'};
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    padding: 2px 6px 0px 6px;
    height: 14px;
  }
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
    -webkit-line-clamp: 2;
  }
`;
