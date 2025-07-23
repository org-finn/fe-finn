import styled from 'styled-components';
import { Text } from '../common/typography/Text';
import { NewsDataResponse } from '@/types';

export default function NewsItem({ item }: { item: NewsDataResponse }) {
  const handleClick = () => {
    window.open(item.contentUrl, '_blank');
  };

  return (
    <Wrapper onClick={handleClick}>
      <NewsContent>
        <ImageContainer>
          <Image src={item.thumbnailUrl} alt={item.title} />
        </ImageContainer>
        <TextContainer>
          <Text size="m" weight="bold">
            {item.title}
          </Text>
          <DateAndCompany>
            <Text size="xs" weight="normal" variant="grey">
              {item.publishedDate}
            </Text>
            <CompanyTag>
              <Text size="xs" weight="normal">
                {item.companyName}
              </Text>
            </CompanyTag>
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
