import TickerList from '@/components/Ticker/TickerList';
import styled from 'styled-components';
import { useGetPopularTickers } from '@/api/hooks/useGetTickerList';

export default function TickerPage() {
  const { data: TickerData } = useGetPopularTickers();
  return (
    <Wrapper>
      <TickerList items={TickerData?.content.predictionList || []} />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
`;
