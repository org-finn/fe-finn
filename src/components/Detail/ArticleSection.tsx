import { Paragraph } from '@/components/common/typography/Paragraph';
import { DetailArticleData } from '@/types';
import RotationArticleItem from '@/components/Detail/RotationArticleItem';

type ArticleSectionProps = {
  articles: DetailArticleData[];
  currentIndex: number;
  tickerCode: string;
  isMobile: boolean;
};

export default function ArticleSection({
  articles,
  currentIndex,
  tickerCode,
  isMobile,
}: ArticleSectionProps) {
  const currentArticle = articles[currentIndex];

  if (!currentArticle) {
    return null;
  }

  return (
    <>
      <Paragraph size={isMobile ? 'xs' : 's'} weight="bold">
        실시간 기사
      </Paragraph>
      <RotationArticleItem
        key={currentIndex}
        item={articles[currentIndex]}
        tickerCode={tickerCode}
      />
    </>
  );
}
