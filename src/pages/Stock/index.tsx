import StockList from '@/components/Stock/StockList';
import styled from 'styled-components';
import { useGetPopularStocks } from '@/api/hooks/useGetStockList';

export default function StockPage() {
  const { data: stockData } = useGetPopularStocks();
  return (
    <Wrapper>
      <StockList items={stockData?.content.stockList} />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
`;
