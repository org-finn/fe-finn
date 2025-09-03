import styled from 'styled-components';
import { Text } from '../common/typography/Text';
import { DetailArticleData } from '@/types';

export default function RotationArticleItem({
  item,
}: {
  item: DetailArticleData;
}) {
  const handleClick = () => {
    return location.pathname === '/news';
  };

  const getSentimentInfo = () => {
    if (item.sentiment === 'positive') {
      return { label: '긍정', emoji: '📈', color: '#ef4444' };
    } else if (item.sentiment === 'negative') {
      return { label: '부정', emoji: '📉', color: '#3b82f6' };
    } else {
      return { label: '중립', emoji: '➖', color: '#6b7280' };
    }
  };

  const sentimentInfo = getSentimentInfo();

  return (
    <Wrapper onClick={handleClick}>
      <NewsContent>
        <TextContainer>
          <TitleRow>
            <TitleText size="m" weight="bold">
              {item.headline}
            </TitleText>
            {item.sentiment !== null && (
              <SentimentTag $color={sentimentInfo.color}>
                <span>{sentimentInfo.emoji}</span>
                <Text size="xs" weight="bold">
                  {sentimentInfo.label}
                </Text>
              </SentimentTag>
            )}
          </TitleRow>
          <DescriptionText size="xs" weight="normal" variant="grey">
            Provides AI chips and hardware, positioned in a high-growth industry
            with significant potential
          </DescriptionText>
        </TextContainer>
      </NewsContent>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 30px;
  color: black;
  background-color: #f7faff;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  animation: fadeIn 0.5s ease-in-out;

  &:hover {
    background-color: #f4f7fc;
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
    height: 100%;
    gap: 12px;
  }
`;

const NewsContent = styled.div`
  position: relative;
  width: 90%;
  display: flex;
  height: 100%;
  gap: 16px;

  @media screen and (max-width: 768px) {
    gap: 8px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: flex-start;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TitleText = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: normal;
`;

const DescriptionText = styled(Text)`
  line-height: 1.2;
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
`;
