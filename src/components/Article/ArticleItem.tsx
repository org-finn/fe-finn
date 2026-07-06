import styled from 'styled-components';
import { Text } from '../common/typography/Text';
import { ArticleDataResponse } from '@/types';
import FallbackImage from '../common/Item/FallbackImage';
import useIsMobile from '@/hooks/useIsMobile';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { PiHeartFill, PiHeartLight } from 'react-icons/pi';
import useAuth from '@/hooks/useAuth';
import { usePutFavoriteArticle } from '@/api/hooks/usePutFavoriteArticle';
import LoginModal from '@/components/common/Modal/LoginModal';

export default function NewsItem({
  item,
  onToggleLike,
}: {
  item: ArticleDataResponse;
  onToggleLike?: (articleId: string) => void;
}) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(item.isFavorite ?? false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { mutate: putFavoriteArticle } = usePutFavoriteArticle();

  const handleClick = () => {
    navigate(`/news/${item.articleId}`);
  };

  const handleLikeClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (onToggleLike) {
        onToggleLike(item.articleId);
        return;
      }
      if (!isAuthenticated) {
        setShowLoginModal(true);
        return;
      }
      const nextFavorite = !isFavorite;
      setIsFavorite(nextFavorite);
      putFavoriteArticle(
        { articleId: item.articleId, mode: nextFavorite ? 'on' : 'off' },
        {
          onError: () => {
            setIsFavorite(!nextFavorite);
            alert('스크랩 처리에 실패했습니다. 다시 시도해주세요.');
          },
        }
      );
    },
    [
      isFavorite,
      isAuthenticated,
      item.articleId,
      putFavoriteArticle,
      onToggleLike,
    ]
  );

  return (
    <>
      <Wrapper onClick={handleClick}>
        <LikeIconWrapper onClick={handleLikeClick}>
          {isFavorite ? (
            <PiHeartFill color="#fe7373" size={isMobile ? 18 : 22} />
          ) : (
            <PiHeartLight size={isMobile ? 18 : 22} color="#ccc" />
          )}
        </LikeIconWrapper>
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
                  {item.shortCompanyNames?.slice(0, 2).map((company, i) => (
                    <CompanyTag key={`${company}-${i}`}>
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
                <Text size="12px" weight="normal" variant="grey">
                  {item.publishedDate}
                </Text>
              </>
            ) : (
              <>
                <CompanyContainer>
                  {item.shortCompanyNames?.slice(0, 5).map((company, i) => (
                    <CompanyTag key={`${company}-${i}`}>
                      <Text size="xs" weight="normal">
                        {company}
                      </Text>
                    </CompanyTag>
                  ))}
                  {item.shortCompanyNames &&
                    item.shortCompanyNames.length > 4 && (
                      <CompanyTag>
                        <Text size="xs" weight="normal">
                          ...
                        </Text>
                      </CompanyTag>
                    )}
                </CompanyContainer>
                <Text size="xs" weight="normal" variant="grey">
                  {item.publishedDate}
                </Text>
              </>
            )}
          </TextContainer>
        </NewsContent>
      </Wrapper>
      {showLoginModal && (
        <LoginModal
          immediateOpen={true}
          currentPath={location.pathname}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
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

const CompanyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;

  @media screen and (max-width: 768px) {
    padding: 2px 0;
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

const LikeIconWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 1;
  z-index: 1;
`;
