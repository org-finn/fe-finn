import { styled } from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { Paragraph } from '@/components/common/typography/Paragraph';
import { Text } from '@/components/common/typography/Text';
import SearchTickerSection from '@/components/Search/SearchTickerSection';
import SearchArticleSection from '@/components/Search/SearchArticleSection';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  return (
    <Wrapper>
      <TitleWrapper>
        <Paragraph weight="normal" size="m">
          <Text weight="bold" size="m" variant="#2d70d3">
            {`${keyword} `}
          </Text>
          검색 결과
        </Paragraph>
      </TitleWrapper>
      <SearchListSection>
        <SearchTickerSection keyword={keyword} />
        <SearchArticleSection keyword={keyword} />
      </SearchListSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 0px 0px 0px;

  @media screen and (max-width: 768px) {
    width: 100%;
    gap: 30px;
    align-items: center;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    width: 90%;
    gap: 10px;
    margin-bottom: 10px;
  }
`;

const SearchListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 40px;

  @media screen and (max-width: 768px) {
    width: 90%;
    gap: 30px;
    margin-bottom: 10px;
  }
`;
