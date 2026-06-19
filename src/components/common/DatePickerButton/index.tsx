import { useRef } from 'react';
import { FiCalendar } from 'react-icons/fi';
import styled from 'styled-components';

type DatePickerButtonProps = {
  selectedDate: string;
  onDateChange: (date: string) => void;
};

export default function DatePickerButton({
  selectedDate,
  onDateChange,
}: DatePickerButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.showPicker();
  };

  return (
    <Wrapper>
      <IconButton onClick={handleClick} type="button" aria-label="날짜 선택">
        <FiCalendar />
      </IconButton>
      <HiddenInput
        ref={inputRef}
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        max={new Date().toLocaleDateString('sv-SE')}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #6b7280;
  border-radius: 4px;
  transition:
    color 0.15s,
    background-color 0.15s;

  &:hover {
    color: #374151;
    background-color: #f3f4f6;
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media screen and (max-width: 768px) {
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
`;
