import styled from 'styled-components';
import StockItem from './StockItem';
import { StockData } from '@/types';

export default function StockList() {
  const items: StockData[] = [
    {
      stockId: 1,
      company: 'Aplphabet Inc.',
      stockCode: 'GOOGL',
      predictedPrice: 210.5,
      predictedChangeRate: 1.8,
      isUp: true,
    },
    {
      stockId: 2,
      company: 'Apple Inc.',
      stockCode: 'AAPL',
      predictedPrice: 210.5,
      predictedChangeRate: 1.8,
      isUp: false,
    },
    {
      stockId: 3,
      company: 'Coinbase Global, Inc.',
      stockCode: 'COIN',
      predictedPrice: 210.5,
      predictedChangeRate: 1.8,
      isUp: true,
    },
    {
      stockId: 4,
      company: 'Meta Platforms, Inc.',
      stockCode: 'Meta',
      predictedPrice: 210.5,
      predictedChangeRate: 1.8,
      isUp: true,
    },
    {
      stockId: 5,
      company: 'Netflix, Inc.',
      stockCode: 'NFLX',
      predictedPrice: 210.5,
      predictedChangeRate: 1.8,
      isUp: false,
    },
  ];
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
