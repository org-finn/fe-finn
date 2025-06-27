import styled from 'styled-components';
import StockItem from './StockItem';
import { StockItemData } from '@/types';

export default function StockList({ items = [] }: { items: StockItemData[] }) {
  return (
    <Wrapper>
      {items.map((item) => (
        <StockItem key={item.stockId} item={item} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
