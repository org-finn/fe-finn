import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { Text } from '@/components/common/typography/Text';

type Props = {
  selectedTickers: { tickerCode: string; shortCompanyName: string }[];
  onClearTicker: (tickerCode: string) => void;
};

export default function FilterChip({ selectedTickers, onClearTicker }: Props) {
  return (
    <Container>
      {selectedTickers.map((ticker) => (
        <ChipButton key={ticker.tickerCode}>
          <Text size="xxs" weight="normal" variant="#305675">
            {ticker.shortCompanyName}
          </Text>
          <ClearButton
            aria-label="종목 칩 제거"
            onClick={() => onClearTicker(ticker.tickerCode)}
          >
            <IoClose size={14} />
          </ClearButton>
        </ChipButton>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    flex-shrink: 0;
  }

  @media screen and (max-width: 768px) {
    padding: 0;
    gap: 8px;
    margin: 14px 0;
  }
`;

const ChipButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: 'space-between';
  padding: 4px 10px 4px 18px;
  height: 24px;
  border-radius: 18px;
  background-color: #dbeeff;
  color: #898989;

  @media screen and (max-width: 768px) {
    padding: 4px 10px 4px 14px;
    font-size: 14px;
    height: 20px;
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2px;
  padding: 2px;
  border-radius: 50%;
  cursor: pointer;
  background: none;
  border: none;
  color: inherit;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
