import styled from 'styled-components';
import { Text } from '../common/typography/Text';
import { ArticleDataResponse } from '@/types';

export default function NewsItem({ item }: { item: ArticleDataResponse }) {
  const handleClick = () => {
    window.open(item.contentUrl, '_blank');
  };

  // const getSentimentInfo = () => {
  //   if (item.sentiment === 'positive') {
  //     return { label: '긍정', emoji: '📈', color: '#ef4444' };
  //   } else if (item.sentiment === 'negative') {
  //     return { label: '부정', emoji: '📉', color: '#3b82f6' };
  //   } else {
  //     return { label: '중립', emoji: '➖', color: '#6b7280' };
  //   }
  // };

  // const sentimentInfo = getSentimentInfo();

  return (
    <Wrapper onClick={handleClick}>
      <NewsContent>
        <ImageContainer>
          <Image src={item.thumbnailUrl} alt={item.title} />
        </ImageContainer>
        <TextContainer>
          <TitleText size="m" weight="bold">
            {item.title}
          </TitleText>
          <DateAndCompany>
            <Text size="xs" weight="normal" variant="grey">
              {item.publishedDate}
            </Text>
            {/* {item.sentiment !== null && (
              <SentimentTag $color={sentimentInfo.color}>
                <span>{sentimentInfo.emoji}</span>
                <Text size="xs" weight="bold">
                  {sentimentInfo.label}
                </Text>
              </SentimentTag>
            )} */}
            {item.shortCompanyNames?.map((company) => (
              <CompanyTag key={company}>
                <Text size="xs" weight="normal">
                  {company}
                </Text>
              </CompanyTag>
            ))}
          </DateAndCompany>
        </TextContainer>
      </NewsContent>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  color: black;
  background-color: #f7faff;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: #f4f7fc;
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

const ImageContainer = styled.div`
  width: 120px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media screen and (max-width: 430px) {
    width: 70px;
    height: 70px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
`;

const TitleText = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  word-break: break-all;
  white-space: normal;
`;

const DateAndCompany = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 6px;

  @media screen and (max-width: 768px) {
    padding-top: 2px;
  }
`;

const CompanyTag = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  background-color: #e5e7eb;
  border-radius: 12px;
  color: #374151;

  span {
    color: #374151 !important;
  }
`;

// const SentimentTag = styled.div<{ $color: string }>`
//   display: inline-flex;
//   align-items: center;
//   gap: 4px;
//   padding: 6px 8px 4px 8px;
//   background-color: ${(props) => props.$color}15;
//   border: 1px solid ${(props) => props.$color}40;
//   border-radius: 12px;
//   white-space: nowrap;
//   flex-shrink: 0;

//   span {
//     font-size: 12px;
//   }

//   & > *:last-child {
//     color: ${(props) => props.$color} !important;
//   }
// `;
