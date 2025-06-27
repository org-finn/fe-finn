import StockList from '@/components/Stock/StockList';
import { LoveItems } from '@/constants/dummy';
import styled from 'styled-components';

export default function StockPage() {
  return (
    <Wrapper>
      <StockList items={LoveItems} />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
`;
