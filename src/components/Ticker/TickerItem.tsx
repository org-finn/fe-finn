import styled from 'styled-components';
import { Text } from '../common/typography/Text';
import { PredictionDataResponse } from '@/types';
import { Link } from 'react-router-dom';
import useGetVariant from '@/hooks/useGetVariant';
import useGetSignSymbol from '@/hooks/useGetSignSymbol';
import useIsMobile from '@/hooks/useIsMobile';

export default function TickerItem({ item }: { item: PredictionDataResponse }) {
  const isMobile = useIsMobile();
  const getVariant = useGetVariant(item.sentiment);
  const getSignSymbol = useGetSignSymbol(item.sentiment);
  const getSentiment =
    item.sentiment > 0 ? '긍정' : item.sentiment < 0 ? '부정' : '관련';
  return (
    <Wrapper to={`/ticker/${item.tickerId}`}>
      <TickerInfo>
        <Text size={isMobile ? 's' : 'm'} weight="bold">
          {item.tickerCode}
        </Text>
        <Text size={isMobile ? 'xxs' : 'xs'} weight="normal" variant="grey">
          {item.shortCompanyName}
        </Text>
      </TickerInfo>
      <PriceInfo>
        <Text size={isMobile ? 's' : 'm'} weight="bold" variant={getVariant}>
          {getSignSymbol} {item.predictionStrategy} 신호
        </Text>
        <ArticleChip $variant={getVariant}>
          <Text
            size={isMobile ? '12px' : 'xxs'}
            weight="bold"
            variant={
              getVariant === 'red'
                ? '#ef4444'
                : getVariant === 'blue'
                  ? '#3b82f6'
                  : '#6b7280'
            }
          >
            {getSentiment} 기사 {item.articleCount}건
          </Text>
        </ArticleChip>
      </PriceInfo>
    </Wrapper>
  );
}

const Wrapper = styled(Link)`
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  color: black;
  background-color: #f7faff;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f4f7fc;
  }

  @media screen and (max-width: 768px) {
    padding: 18px 28px;
  }
`;
const TickerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 6px;
`;
const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  span {
    display: inline-flex;
    justify-content: end;
  }
  svg {
    margin-right: -3px;
  }
`;

const ArticleChip = styled.div<{ $variant: string }>`
  display: flex;
  align-items: end;
  justify-content: flex-end;
  padding: 6px 10px;
  border-radius: 18px;
  background-color: ${(props) =>
    props.$variant === 'red'
      ? '#ffecec'
      : props.$variant === 'blue'
        ? '#e6f0ff'
        : '#f0f0f0'};
  color: ${(props) => props.$variant}15;
  width: fit-content;
  margin-left: auto;

  @media screen and (max-width: 768px) {
    padding: 4px 8px;
  }
`;
