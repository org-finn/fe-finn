import styled from 'styled-components';
import { Text } from '../common/typography/Text';
import { ArticleDataResponse } from '@/types';
import FallbackImage from '../common/Item/FallbackImage';
import useIsMobile from '@/hooks/useIsMobile';

export default function NewsItem({ item }: { item: ArticleDataResponse }) {
  const isMobile = useIsMobile();
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
          <FallbackImage src={item.thumbnailUrl} alt={item.title} />
        </ImageContainer>
        <TextContainer>
          <TitleText size={isMobile ? 'xs' : 'm'} weight="bold">
            {item.title}
          </TitleText>
          {isMobile ? (
            <>
              <CompanyContainer>
                {item.shortCompanyNames?.slice(0, 2).map((company) => (
                  <CompanyTag key={company}>
                    <Text size="12px" weight="normal">
                      {company}
                    </Text>
                  </CompanyTag>
                ))}
                {item.shortCompanyNames &&
                  item.shortCompanyNames.length > 2 && (
                    <CompanyTag>
                      <Text size="12px" weight="normal">
                        ...
                      </Text>
                    </CompanyTag>
                  )}
              </CompanyContainer>
              <DateContainer>
                <Text size="12px" weight="normal" variant="grey">
                  {item.publishedDate}
                </Text>
              </DateContainer>
            </>
          ) : (
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
              {item.shortCompanyNames?.slice(0, 5).map((company) => (
                <CompanyTag key={company}>
                  <Text size="xs" weight="normal">
                    {company}
                  </Text>
                </CompanyTag>
              ))}
              {item.shortCompanyNames && item.shortCompanyNames.length > 5 && (
                <CompanyTag>
                  <Text size="xs" weight="normal">
                    ...
                  </Text>
                </CompanyTag>
              )}
            </DateAndCompany>
          )}
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
    padding: 12px 16px;
  }
`;

const NewsContent = styled.div`
  position: relative;
  width: 90%;
  display: flex;
  gap: 16px;

  @media screen and (max-width: 768px) {
    gap: 12px;
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  width: 120px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    width: 90px;
    height: 60px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;

  @media screen and (max-width: 768px) {
    gap: 4px;
  }
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
`;

const DateContainer = styled.div`
  padding-top: 2px;
`;

const CompanyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 4px;
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
