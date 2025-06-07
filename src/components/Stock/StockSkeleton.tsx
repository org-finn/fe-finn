import styled from 'styled-components';
import Skeleton from '../ui/Skeleton';

export default function StockSkeleton() {
  return (
    <Wrapper>
      <StockWrapper>
        <Skeleton width="960px" height="44px" borderRadius="16px" />
        <Skeleton width="960px" height="400px" borderRadius="0px" />
      </StockWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 110px;
`;
const StockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
