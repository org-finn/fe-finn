import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { useGetArticleDetail } from '@/api/hooks/useGetArticleDetail';
import Loading from '@/components/common/Layout/Loading';
import { Text } from '@/components/common/typography/Text';
import { Paragraph } from '@/components/common/typography/Paragraph';
import ArticleTicker from '@/components/ArticleDetail/ArticleTicker';
import { IoIosArrowBack } from 'react-icons/io';
import { PiHeartFill, PiHeartLight } from 'react-icons/pi';
import styled from 'styled-components';
import useIsMobile from '@/hooks/useIsMobile';
import useAuth from '@/hooks/useAuth';
import { usePutFavoriteArticle } from '@/api/hooks/usePutFavoriteArticle';
import LoginModal from '@/components/common/Modal/LoginModal';

export default function ArticleDetailPage() {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isAuthenticated } = useAuth();
  const { data: articleResponse, isLoading, error } = useGetArticleDetail(id);
  const articleData = articleResponse?.content;
  const [isFavorite, setIsFavorite] = useState(
    articleData?.isFavorite ?? false
  );
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { mutate: putFavoriteArticle } = usePutFavoriteArticle();

  const handleLikeClick = useCallback(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    const nextFavorite = !isFavorite;
    setIsFavorite(nextFavorite);
    putFavoriteArticle(
      { articleId: id, mode: nextFavorite ? 'on' : 'off' },
      {
        onError: () => {
          setIsFavorite(!nextFavorite);
          alert('스크랩 처리에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );
  }, [isFavorite, isAuthenticated, id, putFavoriteArticle]);

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
          <PublishInfo>
            {isMobile ? (
              <>
                <Text size="xs" weight="normal" variant="grey">
                  {articleData.publishedDate}
                </Text>
                <Text size="xs" weight="normal" variant="grey">
                  {articleData.source}
                </Text>
              </>
            ) : (
              <Text size="s" weight="normal" variant="grey">
                {articleData.publishedDate} · {articleData.source}
              </Text>
            )}
          </PublishInfo>
          <OriginalLink
            href={articleData.contentUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text
              size={isMobile ? 'xxs' : 'xs'}
              weight="normal"
              variant="#2d70d3"
            >
              원문 보기
            </Text>
          </OriginalLink>
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

      <ScrapButtonWrapper>
        <ScrapButton onClick={handleLikeClick}>
          {isFavorite ? (
            <PiHeartFill color="#fe7373" size={isMobile ? 16 : 18} />
          ) : (
            <PiHeartLight size={isMobile ? 16 : 18} color="#2d70d3" />
          )}
          <Text
            size={isMobile ? 'xxs' : 'xs'}
            weight="normal"
            variant="#2d70d3"
          >
            기사 스크랩
          </Text>
        </ScrapButton>
      </ScrapButtonWrapper>

      {showLoginModal && (
        <LoginModal
          immediateOpen={true}
          currentPath={location.pathname}
          onClose={() => setShowLoginModal(false)}
        />
      )}
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

const PublishInfo = styled.div`
  flex-direction: row;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

const OriginalLink = styled.a`
  display: flex;
  padding: 8px 14px;
  align-items: center;
  border: 1px solid #2d70d3;
  border-radius: 8px;
  background-color: #ffffff;
  margin-top: -6px;

  &:hover {
    background-color: #f3f5f7;
  }

  @media screen and (max-width: 768px) {
    margin-top: 0px;
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

const ScrapButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ScrapButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid #2d70d3;
  border-radius: 8px;
  background-color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: #f3f5f7;
  }
`;

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #e74c3c;
`;
