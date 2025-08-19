import styled from 'styled-components';
import StockItem from './StockItem';
import { StockItemData } from '@/types';
import Loading from '../common/Layout/Loading';

interface StockListProps {
  items?: StockItemData[];
  isLoading?: boolean;
  error?: Error | null;
}

export default function StockList({
  items = [],
  isLoading = false,
  error,
}: StockListProps) {
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return (
      <ErrorWrapper>데이터를 불러오는 중 오류가 발생했습니다.</ErrorWrapper>
    );
  }
  if (items.length === 0) {
    return <EmptyWrapper>표시할 주식 데이터가 없습니다.</EmptyWrapper>;
  }
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

const ErrorWrapper = styled.div`
  padding: 20px;
  text-align: center;
  color: #e74c3c;
`;

const EmptyWrapper = styled.div`
  padding: 20px;
  text-align: center;
  color: #888;
`;
