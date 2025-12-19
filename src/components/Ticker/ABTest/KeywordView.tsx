import styled from 'styled-components';
import { Text } from '@/components/common/typography/Text';
import useIsMobile from '@/hooks/useIsMobile';
import { useState, useEffect } from 'react';
import useGetVariant from '@/hooks/useGetVariant';
import useGetSignSymbol from '@/hooks/useGetSignSymbol';
import { getChipColors } from '@/hooks/useGetChipColors';

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

  const hasKeywords = positiveKeywords || negativeKeywords;

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
  const keywordVariant = displayType === 'positive' ? 'red' : 'blue';

  return (
    <KeywordSection key={`${displayType}-${displayKeywords[0]}`}>
      <ChipContainer>
        <SignalChip>
          {getSignSymbol && (
            <span style={{ fontSize: '10px' }}>{getSignSymbol}</span>
          )}
          <Text
            size={isMobile ? 'xxs' : 'xs'}
            weight="bold"
            variant={getVariant}
          >
            {predictionStrategy} 신호
          </Text>
        </SignalChip>
      </ChipContainer>
      {hasKeywords ? (
        <KeywordContent>
          <KeywordList>
            {visibleKeywords.map((keyword, index) => (
              <KeywordChip key={index} $variant={keywordVariant}>
                <Text
                  size={isMobile ? '12px' : 'xxs'}
                  weight="normal"
                  variant={keywordVariant}
                >
                  {keyword.trim()}
                </Text>
              </KeywordChip>
            ))}
            {hasMore && (
              <KeywordChip $variant={keywordVariant}>
                <Text
                  size={isMobile ? '12px' : 'xxs'}
                  weight="normal"
                  variant={keywordVariant}
                >
                  ...
                </Text>
              </KeywordChip>
            )}
          </KeywordList>
        </KeywordContent>
      ) : (
        <NoKeywordMessage>
          <Text size={isMobile ? '12px' : 'xxs'} weight="normal" variant="grey">
            분석된 키워드가 없습니다
          </Text>
        </NoKeywordMessage>
      )}
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
`;

const KeywordChip = styled.div<{ $variant: string }>`
  display: flex;
  align-items: center;
  position: relative;
  gap: 4px;
  padding: 4px 10px 2px 10px;
  margin-top: -2px;
  height: 16px;
  border-radius: 18px;
  background: ${(props) => getChipColors(props.$variant).gradient};
  box-shadow: ${(props) => getChipColors(props.$variant).shadow};
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    border-radius: 18px 18px 0 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.4) 0%,
      transparent 100%
    );
  }

  @media screen and (max-width: 768px) {
    padding: 2px 8px 0px 8px;
    margin-top: 0;
    height: 18px;
  }
`;

const NoKeywordMessage = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 6px;
`;
