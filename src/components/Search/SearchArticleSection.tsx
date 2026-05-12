import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { Text } from '@/components/common/typography/Text';
import { useGetArticleSearchList } from '@/api/hooks/useGetArticleSearchList';
import useIsMobile from '@/hooks/useIsMobile';
import NoItem from '@/components/common/Layout/NoItem';
import NewsItem from '@/components/Article/ArticleItem';

const ARTICLE_LIMIT = 3;

type SearchArticleSectionProps = {
  keyword: string;
};

export default function SearchArticleSection({
  keyword,
}: SearchArticleSectionProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const { data: searchData, isLoading } = useGetArticleSearchList(keyword);
  const allArticles = searchData?.content.articles ?? [];
  const articles = allArticles.slice(0, ARTICLE_LIMIT);
  const hasMore = searchData?.content.isMore ?? false;

  return (
    <SectionContainer>
      <SectionHeader>
        <Text size={isMobile ? 's' : 'm'} weight="bold">
          관련 기사
        </Text>
        {hasMore && (
          <MoreBtn
            onClick={() =>
              navigate(`/news?filter=${encodeURIComponent(keyword)}`)
            }
          >
            더 보기
            <IoIosArrowForward />
          </MoreBtn>
        )}
      </SectionHeader>
      {articles.length === 0 ? (
        <NoItem
          message={isLoading ? '검색 중...' : '관련 기사가 없어요!'}
          height={200}
        />
      ) : (
        <ArticleList>
          {articles.map((article) => (
            <NewsItem key={article.articleId} item={article} />
          ))}
        </ArticleList>
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

const MoreBtn = styled.button`
  border: none;
  background: none;
  border-radius: 10px;
  padding: 8px 10px;
  color: black;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 768px) {
    padding: 6px 8px;
    font-size: 12px;
  }
`;

const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
