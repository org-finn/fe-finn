import styled from 'styled-components';
import { Text } from '../common/typography/Text';
import { ArticleSummaryTickerResponse } from '@/types';
import useIsMobile from '@/hooks/useIsMobile';
import { Paragraph } from '../common/typography/Paragraph';

type SummaryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  summaryData: ArticleSummaryTickerResponse | null;
};

export default function SummaryModal({
  isOpen,
  onClose,
  summaryData,
}: SummaryModalProps) {
  const isMobile = useIsMobile();

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const [, month, day] = dateString.split('-');
    return `${Number(month)}월 ${Number(day)}일`;
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer $isMobile={isMobile}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <ModalHeader>
          <Paragraph size={isMobile ? 's' : 'm'} weight="bold">
            {summaryData?.summaryDate && formatDate(summaryData.summaryDate)}의
            뉴스 요약
          </Paragraph>
        </ModalHeader>
        <ModalContent>
          <ReasoningSection>
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
              <Text
                size={isMobile ? 'xxs' : 'xs'}
                weight="normal"
                variant="grey"
              >
                관련 정보가 없습니다.
              </Text>
            )}
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
              <Text
                size={isMobile ? 'xxs' : 'xs'}
                weight="normal"
                variant="grey"
              >
                관련 정보가 없습니다.
              </Text>
            )}
          </ReasoningSection>
          <KeywordSection>
            <Paragraph size={isMobile ? 'xs' : 's'} weight="bold">
              핵심 키워드
            </Paragraph>
            {(summaryData?.positiveKeywords &&
              summaryData.positiveKeywords.length > 0) ||
            (summaryData?.negativeKeywords &&
              summaryData.negativeKeywords.length > 0) ? (
              <>
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
              </>
            ) : (
              <Text
                size={isMobile ? 'xxs' : 'xs'}
                weight="normal"
                variant="grey"
              >
                관련 정보가 없습니다.
              </Text>
            )}
          </KeywordSection>
        </ModalContent>
      </ModalContainer>
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalContainer = styled.div<{ $isMobile: boolean }>`
  position: fixed;
  z-index: 101;
  background-color: #f7faff;
  border-radius: 12px;
  max-height: 650px;
  padding: 12px 0;
  overflow-y: auto;
  animation: ${(props) => (props.$isMobile ? 'slideUp 0.3s ease-out' : 'none')};

  ${(props) =>
    props.$isMobile
      ? `
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `
      : `
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 480px;
  `}

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: grey;
  padding: 4px 8px;

  @media screen and (max-width: 768px) {
    top: 16px;
    right: 16px;
    font-size: 20px;
  }
`;

const ModalHeader = styled.div`
  padding: 20px 24px 0px 24px;

  @media screen and (max-width: 768px) {
    padding: 16px 20px 0px 20px;
  }
`;

const ModalContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media screen and (max-width: 768px) {
    padding: 20px;
    gap: 24px;
  }
`;

const ReasoningSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background-color: white;
  border-radius: 20px;

  @media screen and (max-width: 768px) {
    padding: 16px;
    gap: 14px;
  }
`;

const KeywordSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background-color: white;
  border-radius: 20px;

  @media screen and (max-width: 768px) {
    padding: 16px;
    gap: 14px;
  }
`;

const KeywordRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media screen and (max-width: 768px) {
    gap: 8px;
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
    padding: 6px 6px 6px 6px;
    gap: 2px;

    span {
      font-size: 10px;
    }
  }
`;
