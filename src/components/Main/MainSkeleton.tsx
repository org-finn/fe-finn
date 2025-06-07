import styled from 'styled-components';
import Skeleton from '../ui/Skeleton';

export default function MainSkeleton() {
  return (
    <Wrapper>
      <MainWrapper>
        <Skeleton width="960px" height="44px" borderRadius="16px" />
        <Skeleton width="960px" height="400px" borderRadius="0px" />
      </MainWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 110px;
`;
const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
