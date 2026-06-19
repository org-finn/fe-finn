import styled from 'styled-components';
import { FiFileText } from 'react-icons/fi';
import { Paragraph } from '@/components/common/typography/Paragraph';
import { Text } from '@/components/common/typography/Text';
import Button from '@/components/common/Button';
import { ArticleSummaryTickerResponse } from '@/types';
import useIsMobile from '@/hooks/useIsMobile';

export type DailySummaryProps = {
  summaryData: null | ArticleSummaryTickerResponse;
  isEnabled: boolean;
  isLoading: boolean;
  onRequestSummary: () => void;
};

export default function DailySummary({
  summaryData,
  isEnabled,
  isLoading,
  onRequestSummary,
}: DailySummaryProps) {
  const isMobile = useIsMobile();

  if (!isEnabled) {
    return (
      <Container>
        <PlaceholderWrapper>
          <FiFileText size={isMobile ? 28 : 32} color="#9ca3af" />
          <PlaceholderTextSection>
            <Paragraph size={isMobile ? 'xs' : 's'} weight="bold">
              오늘의 뉴스 요약
            </Paragraph>
            <Text size={isMobile ? 'xxs' : 'xs'} weight="normal" variant="grey">
              AI가 분석한 긍정·부정 요인을 확인해보세요
            </Text>
          </PlaceholderTextSection>
          <GenerateButton
            variant="mint"
            size="small"
            onClick={onRequestSummary}
          >
            뉴스 요약 생성하기
          </GenerateButton>
        </PlaceholderWrapper>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <LoadingWrapper>
          <Text size={isMobile ? 'xxs' : 'xs'} weight="normal" variant="grey">
            요약 불러오는 중...
          </Text>
        </LoadingWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <ReasoningRow>
        <Section>
          <Text size={isMobile ? 'xs' : 's'} weight="bold" variant="#ff6374">
            긍정 요인
          </Text>
          {summaryData?.positiveReasoning &&
          summaryData.positiveReasoning.length > 0 ? (
            <ReasoningList>
              {summaryData.positiveReasoning.map((reason, index) => (
                <ReasoningItem key={index}>
                  <Text size={isMobile ? 'xxs' : 'xs'} weight="normal">
                    {reason}
                  </Text>
                </ReasoningItem>
              ))}
            </ReasoningList>
          ) : (
            <Text size={isMobile ? 'xxs' : 'xs'} weight="normal" variant="grey">
              관련 정보가 없습니다.
            </Text>
          )}
          {summaryData?.positiveKeywords &&
            summaryData.positiveKeywords.length > 0 && (
              <KeywordRow>
                {summaryData.positiveKeywords.map((keyword, index) => (
                  <KeywordTag key={`pos-${index}`} $color="#FF6374">
                    <span>📈</span>
                    <Text size={isMobile ? 'xxs' : 'xs'} weight="bold">
                      {keyword}
                    </Text>
                  </KeywordTag>
                ))}
              </KeywordRow>
            )}
        </Section>
        <Divider />
        <Section>
          <Text size={isMobile ? 'xs' : 's'} weight="bold" variant="#3b82f6">
            부정 요인
          </Text>
          {summaryData?.negativeReasoning &&
          summaryData.negativeReasoning.length > 0 ? (
            <ReasoningList>
              {summaryData.negativeReasoning.map((reason, index) => (
                <ReasoningItem key={index}>
                  <Text size={isMobile ? 'xxs' : 'xs'} weight="normal">
                    {reason}
                  </Text>
                </ReasoningItem>
              ))}
            </ReasoningList>
          ) : (
            <Text size={isMobile ? 'xxs' : 'xs'} weight="normal" variant="grey">
              관련 정보가 없습니다.
            </Text>
          )}
          {summaryData?.negativeKeywords &&
            summaryData.negativeKeywords.length > 0 && (
              <KeywordRow>
                {summaryData.negativeKeywords.map((keyword, index) => (
                  <KeywordTag key={`neg-${index}`} $color="#3B82F6">
                    <span>📉</span>
                    <Text size={isMobile ? 'xxs' : 'xs'} weight="bold">
                      {keyword}
                    </Text>
                  </KeywordTag>
                ))}
              </KeywordRow>
            )}
        </Section>
      </ReasoningRow>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 12px;
  gap: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 768px) {
    padding: 16px;
    gap: 12px;
    margin-bottom: 10px;
  }
`;

const PlaceholderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 0;

  @media screen and (max-width: 768px) {
    padding: 12px 0;
    gap: 10px;
  }
`;

const PlaceholderTextSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
`;

const GenerateButton = styled(Button)`
  width: auto;
  margin-top: 4px;
  font-size: 14px;
  padding: 0 16px;

  @media screen and (max-width: 768px) {
    padding: 0 12px;
    font-size: 12px;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const ReasoningRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  animation: fadeSlideIn 0.8s ease both;

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media screen and (max-width: 768px) {
    gap: 10px;
  }
`;

const Divider = styled.div`
  width: 1px;
  background-color: #e5e7eb;
  align-self: stretch;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 1px;
  }
`;

const KeywordRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 8px;
  gap: 10px;

  @media screen and (max-width: 768px) {
    gap: 8px;
    padding-top: 6px;
  }
`;

const ReasoningList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ReasoningItem = styled.li`
  padding-left: 16px;
  position: relative;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: grey;
  }

  @media screen and (max-width: 768px) {
    padding-left: 12px;
  }
`;

const KeywordTag = styled.div<{ $color: string }>`
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
    padding: 6px;
    gap: 2px;

    span {
      font-size: 10px;
    }
  }
`;
