import { useState } from 'react';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import { useGetFavoriteArticles } from '@/api/hooks/useGetFavoriteArticles';
import { usePutFavoriteArticle } from '@/api/hooks/usePutFavoriteArticle';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { PiHeartFill } from 'react-icons/pi';
import NoItem from '@/components/common/Layout/NoItem';
import NewsItem from '@/components/Article/ArticleItem';
import { Text } from '@/components/common/typography/Text';

export default function FavoriteArticleSection() {
  const { data } = useGetFavoriteArticles();
  const articles = data?.content.articles ?? [];
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>(
    'left'
  );
  const queryClient = useQueryClient();
  const { mutate: putFavoriteArticle } = usePutFavoriteArticle();
  const PAGE_SIZE = 2;
  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const currentArticles = articles.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

  const handlePrev = () => {
    if (currentPage <= 0) return;
    setSlideDirection('right');
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage >= totalPages - 1) return;
    setSlideDirection('left');
    setCurrentPage((prev) => prev + 1);
  };

  const handleToggleLike = (articleId: string) => {
    putFavoriteArticle(
      { articleId, mode: 'off' },
      {
        onSuccess: () => {
          const newTotalPages = Math.max(
            1,
            Math.ceil((articles.length - 1) / PAGE_SIZE)
          );
          if (currentPage >= newTotalPages && currentPage > 0) {
            setCurrentPage(newTotalPages - 1);
          }
          queryClient.invalidateQueries({ queryKey: ['favoriteArticles'] });
        },
        onError: () => {
          alert('스크랩 해제에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );
  };

  return (
    <SectionContainer>
      <SectionHeader>
        <Text size="m" weight="bold">
          기사 스크랩
        </Text>
        {articles.length > 2 && (
          <PaginationControls>
            <PageButton
              onClick={handlePrev}
              disabled={currentPage === 0}
              aria-label="이전 페이지"
            >
              <GrPrevious size={14} />
            </PageButton>
            <PageDots>
              {Array.from({ length: totalPages }).map((_, i) => (
                <Dot key={i} $active={i === currentPage} />
              ))}
            </PageDots>
            <PageButton
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
              aria-label="다음 페이지"
            >
              <GrNext size={14} />
            </PageButton>
          </PaginationControls>
        )}
      </SectionHeader>

      {articles.length === 0 ? (
        <NoItem message="스크랩한 기사가 없어요!" height={200} />
      ) : (
        <SlideWrapper key={currentPage} $direction={slideDirection}>
          {currentArticles.map((article) => (
            <ArticleWrapper key={article.articleId}>
              <NewsItem item={article} />
              <LikeButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleLike(article.articleId);
                }}
                aria-label="스크랩 해제"
              >
                <PiHeartFill color="#fe7373" size={24} />
              </LikeButton>
            </ArticleWrapper>
          ))}
        </SlideWrapper>
      )}
    </SectionContainer>
  );
}

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const PageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  color: #374151;

  &:disabled {
    color: #d1d5db;
    cursor: default;
  }
`;

const PageDots = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Dot = styled.span<{ $active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? '#0057ff' : '#d1d5db')};
  transition: background-color 0.2s;
`;

const SlideWrapper = styled.div<{ $direction: 'left' | 'right' }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation-name: ${({ $direction }) =>
    $direction === 'left' ? 'slideInFromRight' : 'slideInFromLeft'};
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;

  @keyframes slideInFromRight {
    from {
      transform: translateX(40px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInFromLeft {
    from {
      transform: translateX(-40px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const ArticleWrapper = styled.div`
  position: relative;
`;

const LikeButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  z-index: 1;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }
`;
