import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Text } from '../common/typography/Text';
import { DetailArticleData } from '@/types';
import useIsMobile from '@/hooks/useIsMobile';

export default function RotationArticleItem({
  item,
  tickerCode,
}: {
  item: DetailArticleData;
  tickerCode: string;
}) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/news?tickerCode=${tickerCode}`);
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
            <TitleText size={isMobile ? 'xs' : 'm'} weight="bold">
              {item.headline}
            </TitleText>
            {item.sentiment !== null && (
              <SentimentTag $color={sentimentInfo.color}>
                <span>{sentimentInfo.emoji}</span>
                <Text size={isMobile ? 'xxs' : 'xs'} weight="bold">
                  {sentimentInfo.label}
                </Text>
              </SentimentTag>
            )}
          </TitleRow>
          <DescriptionText
            size={isMobile ? 'xxs' : 'xs'}
            weight="normal"
            variant="grey"
          >
            {item.reasoning}
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
    background-color: #f4f7fc; // 추후 호버 시 해당 stock 필터링한 뉴스보드로 이동 추가
  }

  @media screen and (max-width: 768px) {
    padding: 16px 16px 16px 20px;
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

  @media screen and (max-width: 768px) {
    gap: 8px;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 768px) {
    gap: 6px;
  }
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

  @media screen and (max-width: 768px) {
    padding: 4px 6px;
    gap: 2px;

    span {
      font-size: 10px;
    }
  }
`;
