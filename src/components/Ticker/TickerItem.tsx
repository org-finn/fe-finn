import styled from 'styled-components';
import { Text } from '../common/typography/Text';
import { PredictionDataResponse } from '@/types';
import { Link } from 'react-router-dom';
import useGetVariant from '@/hooks/useGetVariant';
import useGetSignSymbol from '@/hooks/useGetSignSymbol';

export default function TickerItem({ item }: { item: PredictionDataResponse }) {
  const getVariant = useGetVariant(item.sentiment);
  const getSignSymbol = useGetSignSymbol(item.sentiment);
  const getSentiment =
    item.sentiment > 0 ? '긍정' : item.sentiment < 0 ? '부정' : '관련';
  return (
    <Wrapper to={`/ticker/${item.tickerId}`}>
      <TickerInfo>
        <Text size="m" weight="bold">
          {item.tickerCode}
        </Text>
        <Text size="xs" weight="normal" variant="grey">
          {item.shortCompanyName}
        </Text>
      </TickerInfo>
      <PriceInfo>
        <Text size="m" weight="bold" variant={getVariant}>
          {getSignSymbol} {item.predictionStrategy} 추천
        </Text>
        <Text size="xs" weight="bold" variant={getVariant}>
          {getSentiment} 기사 {item.articleCount}건
        </Text>
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
