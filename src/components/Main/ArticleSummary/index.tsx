import styled from 'styled-components';
import { useGetArticleSummary } from '@/api/hooks/useGetArticleSummary';
import { Text } from '@/components/common/typography/Text';
import { Paragraph } from '@/components/common/typography/Paragraph';
import useIsMobile from '@/hooks/useIsMobile';
import { getChipColors } from '@/hooks/useGetChipColors';

export default function ArticleSummary() {
  const { data, isLoading, isError } = useGetArticleSummary();
  const isMobile = useIsMobile();

  if (isLoading || isError || !data) {
    return null;
  }

  const { content } = data;

  return (
    <Container>
      <Title>
        <Paragraph size={isMobile ? 'xs' : 'm'} weight="bold">
          실시간 뉴스 요약
        </Paragraph>
      </Title>

      <SummaryWrapper>
        {content.positiveReasoning.length > 0 && (
          <SummaryItem>
            <IconText>📈</IconText>
            <ContentWrapper>
              <ReasoningText>
                <Text size={isMobile ? 'xxs' : 'sm'} weight="normal">
                  {content.positiveReasoning[0]}
                </Text>
              </ReasoningText>
              {content.positiveKeywords.length > 0 && (
                <KeywordWrapper>
                  {content.positiveKeywords.map((keyword, index) => (
                    <Keyword key={index} $type="positive">
                      <Text size={isMobile ? 'xxs' : 'xs'} weight="normal">
                        {keyword}
                      </Text>
                    </Keyword>
                  ))}
                </KeywordWrapper>
              )}
            </ContentWrapper>
          </SummaryItem>
        )}

        {content.negativeReasoning.length > 0 && (
          <SummaryItem>
            <IconText>📉</IconText>
            <ContentWrapper>
              <ReasoningText>
                <Text size={isMobile ? 'xxs' : 'sm'} weight="normal">
                  {content.negativeReasoning[0]}
                </Text>
              </ReasoningText>
              {content.negativeKeywords.length > 0 && (
                <KeywordWrapper>
                  {content.negativeKeywords.map((keyword, index) => (
                    <Keyword key={index} $type="negative">
                      <Text size={isMobile ? 'xxs' : 'xs'} weight="normal">
                        {keyword}
                      </Text>
                    </Keyword>
                  ))}
                </KeywordWrapper>
              )}
            </ContentWrapper>
          </SummaryItem>
        )}
      </SummaryWrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: #f7faff;
  border-radius: 10px;
  padding: 20px 30px;

  @media screen and (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const Title = styled.div`
  margin-bottom: 16px;

  @media screen and (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 768px) {
    gap: 16px;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;

  @media screen and (max-width: 768px) {
    gap: 10px;
  }
`;

const IconText = styled.div`
  font-size: 24px;
  line-height: 1;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

const ReasoningText = styled.div`
  line-height: 1.5;
`;

const KeywordWrapper = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 4px 0 6px 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Keyword = styled.div<{ $type: 'positive' | 'negative' }>`
  display: flex;
  align-items: center;
  position: relative;
  gap: 4px;
  padding: 6px 12px 4px 12px;
  height: 16px;
  border-radius: 18px;
  background: ${(props) =>
    getChipColors(props.$type === 'positive' ? 'red' : 'blue').gradient};
  box-shadow: ${(props) =>
    getChipColors(props.$type === 'positive' ? 'red' : 'blue').shadow};
  white-space: nowrap;
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

  & > * {
    color: ${(props) =>
      props.$type === 'positive' ? '#ef4444' : '#3b82f6'} !important;
    position: relative;
    z-index: 1;
  }

  @media screen and (max-width: 768px) {
    margin-top: -4px;
    padding: 4px 10px 2px 10px;
    height: 18px;
    gap: 2px;
  }
`;
