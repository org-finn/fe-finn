import styled from 'styled-components';
import { Text } from '@/components/common/typography/Text';
import useIsMobile from '@/hooks/useIsMobile';
import { useState, useEffect } from 'react';
import useGetVariant from '@/hooks/useGetVariant';
import useGetSignSymbol from '@/hooks/useGetSignSymbol';

type KeywordViewProps = {
  predictionStrategy: string;
  sentiment: number;
  positiveKeywords?: string;
  negativeKeywords?: string;
};

export default function KeywordView({
  predictionStrategy,
  sentiment,
  positiveKeywords,
  negativeKeywords,
}: KeywordViewProps) {
  const isMobile = useIsMobile();
  const [showPositive, setShowPositive] = useState(true);
  const getVariant = useGetVariant(sentiment);
  const getSignSymbol = useGetSignSymbol(sentiment);

  useEffect(() => {
    if (!positiveKeywords || !negativeKeywords) return;

    const interval = setInterval(() => {
      setShowPositive((prev) => !prev);
    }, 10000);

    return () => clearInterval(interval);
  }, [positiveKeywords, negativeKeywords]);

  if (!positiveKeywords && !negativeKeywords) {
    return null;
  }

  const displayType =
    positiveKeywords && negativeKeywords
      ? showPositive
        ? 'positive'
        : 'negative'
      : positiveKeywords
        ? 'positive'
        : 'negative';

  const displayKeywords =
    positiveKeywords && negativeKeywords
      ? showPositive
        ? positiveKeywords.split(',')
        : negativeKeywords.split(',')
      : positiveKeywords
        ? positiveKeywords.split(',')
        : negativeKeywords?.split(',') || [];

  const maxKeywords = isMobile ? 3 : 5;
  const visibleKeywords = displayKeywords.slice(0, maxKeywords);
  const hasMore = displayKeywords.length > maxKeywords;

  return (
    <KeywordSection key={`${displayType}-${displayKeywords[0]}`}>
      <ChipContainer>
        <SignalChip>
          {getSignSymbol && (
            <span style={{ fontSize: '10px' }}>{getSignSymbol}</span>
          )}
          <Text
            size={isMobile ? '12px' : 'xxs'}
            weight="bold"
            variant={getVariant}
          >
            {predictionStrategy} 신호
          </Text>
        </SignalChip>
      </ChipContainer>
      <KeywordContent>
        <KeywordList>
          {visibleKeywords.map((keyword, index) => (
            <KeywordChip key={index} $variant={getVariant}>
              <Text
                size={isMobile ? '12px' : 'xxs'}
                weight="normal"
                variant={getVariant}
              >
                {keyword.trim()}
              </Text>
            </KeywordChip>
          ))}
          {hasMore && (
            <KeywordChip $variant={getVariant}>
              <Text
                size={isMobile ? '12px' : 'xxs'}
                weight="normal"
                variant={getVariant}
              >
                ...
              </Text>
            </KeywordChip>
          )}
        </KeywordList>
      </KeywordContent>
    </KeywordSection>
  );
}

const KeywordSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 14px;
  background-color: white;
  border-radius: 8px;
  width: 360px;
  overflow: hidden;
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
    width: 194px;
    padding: 8px 4px;
    gap: 4px;
  }
`;

const ChipContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
`;

const SignalChip = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px 2px 8px;
  height: 16px;
  border-radius: 18px;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    padding: 2px 6px 0px 6px;
    height: 14px;
  }
`;

const KeywordContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const KeywordList = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: nowrap;
  overflow-x: visible;
  padding-left: 6px;
`;

const KeywordChip = styled.div<{ $variant: string }>`
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
    margin-top: 0;
    height: 14px;
  }
`;
