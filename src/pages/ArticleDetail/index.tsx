import { useParams, useNavigate } from 'react-router-dom';
import { useGetArticleDetail } from '@/api/hooks/useGetArticleDetail';
import Loading from '@/components/common/Layout/Loading';
import { Text } from '@/components/common/typography/Text';
import { Paragraph } from '@/components/common/typography/Paragraph';
import ArticleTicker from '@/components/ArticleDetail/ArticleTicker';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
import useIsMobile from '@/hooks/useIsMobile';

export default function ArticleDetailPage() {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { data: articleResponse, isLoading, error } = useGetArticleDetail(id);
  const articleData = articleResponse?.content;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage>기사를 불러오는 중 오류가 발생했습니다.</ErrorMessage>;
  }

  if (!articleData) {
    return <ErrorMessage>기사를 찾을 수 없습니다.</ErrorMessage>;
  }

  return (
    <Wrapper>
      <BackButton onClick={() => navigate('/news')}>
        <IoIosArrowBack size={isMobile ? 18 : 20} />
        <Text size={isMobile ? 'xxs' : 'xs'} weight="normal">
          뒤로가기
        </Text>
      </BackButton>
      <ArticleHeader>
        <ArticleTitle>
          <Paragraph size={isMobile ? 'l' : 'll'} weight="bold">
            {articleData.title}
          </Paragraph>
        </ArticleTitle>
        <ArticlePublishdata>
          <Text size={isMobile ? 'xs' : 's'} weight="normal" variant="grey">
            {articleData.source} · {articleData.publishedDate}
          </Text>
        </ArticlePublishdata>
      </ArticleHeader>

      <ThumbnailContainer>
        <ThumbnailImage
          src={articleData.thumbnailUrl}
          alt={articleData.title}
        />
      </ThumbnailContainer>

      <ArticleContent>
        <Paragraph size={isMobile ? 's' : 'm'} weight="bold">
          요약
        </Paragraph>
        <Text size={isMobile ? 's' : 'm'} weight="normal">
          {articleData.description}
        </Text>
      </ArticleContent>

      {articleData.tickers && articleData.tickers.length > 0 && (
        <TickersSection>
          <Paragraph size={isMobile ? 's' : 'm'} weight="bold">
            관련 종목
          </Paragraph>
          <TickersGrid>
            {articleData.tickers.map((ticker, index) => (
              <ArticleTicker key={index} ticker={ticker} />
            ))}
          </TickersGrid>
        </TickersSection>
      )}
      <OriginalLinkContainer>
        <OriginalLink
          href={articleData.contentUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text size={isMobile ? 'xs' : 's'} weight="normal" variant="#2d70d3">
            원문 보기
          </Text>
        </OriginalLink>
      </OriginalLinkContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px 20px;
  background-color: #f7faff;
  border-radius: 10px;
  margin: 20px 0px;

  @media screen and (max-width: 768px) {
    width: 84%;
    gap: 24px;
    padding: 20px 16px;
    margin: 16px 0px;
  }
`;

const ArticleHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ArticleTitle = styled.div`
  line-height: 1.4;
`;

const ArticlePublishdata = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ThumbnailContainer = styled.div`
  max-height: 400px;
  overflow: hidden;
  border-radius: 12px;

  @media screen and (max-width: 768px) {
    max-height: 250px;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const ArticleContent = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.6;
  gap: 12px;
`;

const TickersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TickersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const OriginalLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 32px;
  border-top: 1px solid #e5e7eb;
`;

const OriginalLink = styled.a`
  padding: 12px 24px;
  border: 1px solid #2d70d3;
  border-radius: 8px;
  background-color: #ffffff;

  &:hover {
    background-color: #f3f5f7;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: -12px;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #e74c3c;
`;
