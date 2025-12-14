import styled from 'styled-components';
import { Text } from '@/components/common/typography/Text';
import { ArticleDetailTickerResponse } from '@/types';
import useIsMobile from '@/hooks/useIsMobile';

interface ArticleTickerProps {
  ticker: ArticleDetailTickerResponse;
}

export default function ArticleTicker({ ticker }: ArticleTickerProps) {
  const isMobile = useIsMobile();

  const getSentimentInfo = () => {
    if (ticker.sentiment === 'positive') {
      return { label: '긍정', emoji: '📈', color: '#ef4444' };
    } else if (ticker.sentiment === 'negative') {
      return { label: '부정', emoji: '📉', color: '#3b82f6' };
    } else {
      return { label: '중립', emoji: '➖', color: '#6b7280' };
    }
  };

  const sentimentInfo = getSentimentInfo();

  return (
    <TickerCard>
      <TickerHeader>
        <Text size={isMobile ? 'xs' : 's'} weight="bold">
          {ticker.shortCompanyName}
        </Text>
        {ticker.sentiment !== null && (
          <SentimentTag $color={sentimentInfo.color}>
            <span>{sentimentInfo.emoji}</span>
            <Text size={isMobile ? 'xxs' : 'xs'} weight="bold">
              {sentimentInfo.label}
            </Text>
          </SentimentTag>
        )}
      </TickerHeader>
      {ticker.reasoning && (
        <TickerReasoning>
          <Text size="xs" weight="normal" variant="grey">
            {ticker.reasoning}
          </Text>
        </TickerReasoning>
      )}
    </TickerCard>
  );
}

const TickerCard = styled.div`
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media screen and (max-width: 768px) {
    padding: 16px;
    gap: 10px;
  }
`;

const TickerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 768px) {
    gap: 8px;
  }
`;

const SentimentTag = styled.div<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px 4px 8px;
  background-color: ${(props) => props.$color}15;
  border: 1px solid ${(props) => props.$color}40;
  border-radius: 12px;
  white-space: nowrap;
  flex-shrink: 0;

  span {
    font-size: 12px;
  }

  & > *:last-child {
    color: ${(props) => props.$color} !important;
  }

  @media screen and (max-width: 768px) {
    padding: 4px 8px;
    gap: 2px;

    span {
      font-size: 10px;
    }
  }
`;

const TickerReasoning = styled.div`
  line-height: 1.4;
`;
