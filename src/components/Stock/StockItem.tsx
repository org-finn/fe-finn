import styled from 'styled-components';
import { IoLogoUsd } from 'react-icons/io5';
import { Text } from '../common/typography/Text';
import { StockItemData } from '@/types';
import { Link } from 'react-router-dom';

export default function StockItem({ item }: { item: StockItemData }) {
  return (
    <Wrapper to={`/stock/${item.stockId}`}>
      <StockInfo>
        <Text size="m" weight="bold">
          {item.stockCode}
        </Text>
        <Text size="xs" weight="normal" variant="grey">
          {item.companyName}
        </Text>
      </StockInfo>
      <PriceInfo>
        <Text size="m" weight="bold" variant={item.isUp ? 'red' : 'blue'}>
          {item.isUp ? `+` : `-`}
          <IoLogoUsd size={18} />
          {item.predictedPrice}
        </Text>
        <Text size="s" weight="bold" variant={item.isUp ? 'red' : 'blue'}>
          {item.predictedChangeRate}%
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
const StockInfo = styled.div`
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
