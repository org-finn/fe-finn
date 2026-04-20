import { Paragraph } from '@/components/common/typography/Paragraph';
import RotationArticleItem from '@/components/Detail/RotationArticleItem';
import { DetailArticleData } from '@/types';

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
