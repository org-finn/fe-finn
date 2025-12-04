import styled from 'styled-components';
import { useGetExchangeRate } from '@/api/hooks/useGetExchangeRate';
import { Text } from '@/components/common/typography/Text';
import useIsMobile from '@/hooks/useIsMobile';

export default function ExchangeRate() {
  const { data, isLoading, isError } = useGetExchangeRate('C01');
  const isMobile = useIsMobile();
  if (isLoading || isError || !data) {
    return null;
  }

  const { content } = data;
  const isPositive = content.changeRate >= 0;

  return (
    <Container>
      <Text size={isMobile ? '12px' : 'xxs'} weight="normal" variant="#666">
        {content.indexInfo}
      </Text>
      <Text size={isMobile ? '12px' : 'xxs'} weight="bold" variant="#000">
        {content.value.toLocaleString('ko-KR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>
      <Text
        size={isMobile ? '12px' : 'xxs'}
        weight="bold"
        variant={isPositive ? '#FF4444' : '#0066FF'}
      >
        {isPositive ? '+' : ''}
        {content.changeRate.toFixed(2)}%
      </Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  background-color: #ffffff;
  border-radius: 32px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    padding: 8px 12px;
    margin-bottom: -10px;
  }
`;
