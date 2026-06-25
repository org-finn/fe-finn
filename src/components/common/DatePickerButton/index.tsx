import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiCalendar } from 'react-icons/fi';
import { DayPicker } from '@daypicker/react';
import '@daypicker/react/style.css';
import styled from 'styled-components';
import useClickOutside from '@/hooks/useClickOutside';

type DatePickerButtonProps = {
  selectedDate: string;
  onDateChange: (date: string) => void;
  popupZIndex?: number;
  popupPosition?: 'fixed' | 'absolute';
};

function parseDateString(value: string): Date | undefined {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day, 12, 0, 0);
}

function formatToISODate(date: Date) {
  return date.toLocaleDateString('sv-SE');
}

export default function DatePickerButton({
  selectedDate,
  onDateChange,
  popupZIndex = 101,
  popupPosition = 'absolute',
}: DatePickerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useClickOutside([wrapperRef, popupRef], () => setIsOpen(false));

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen || !popupRef.current || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const popupWidth = popupRef.current.offsetWidth;
    const isFixed = popupPosition === 'fixed';
    setPopupStyle({
      top: rect.bottom + (isFixed ? 0 : window.scrollY) + 6,
      left: rect.right + (isFixed ? 0 : window.scrollX) - popupWidth,
    });
  }, [isOpen, popupPosition]);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (selected: Date | undefined) => {
    if (selected) {
      onDateChange(formatToISODate(selected));
      setIsOpen(false);
    }
  };

  return (
    <>
      <Wrapper ref={wrapperRef}>
        <IconButton
          onClick={handleToggle}
          type="button"
          aria-label="날짜 선택"
          aria-expanded={isOpen}
        >
          <FiCalendar />
        </IconButton>
      </Wrapper>

      {isOpen &&
        createPortal(
          <PopupContainer
            ref={popupRef}
            style={popupStyle}
            $zIndex={popupZIndex}
            $position={popupPosition}
          >
            <DayPickerWrapper>
              <DayPicker
                mode="single"
                selected={parseDateString(selectedDate)}
                onSelect={handleSelect}
                disabled={{ before: new Date(2026, 5, 1), after: new Date() }}
                defaultMonth={parseDateString(selectedDate)}
              />
            </DayPickerWrapper>
          </PopupContainer>,
          document.body
        )}
    </>
  );
}

const Wrapper = styled.div`
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
  padding: 0 0 4px 0;
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
    width: 18px;
    height: 18px;
  }

  @media screen and (max-width: 768px) {
    padding: 0 0 2px 0;
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const PopupContainer = styled.div<{
  $zIndex: number;
  $position: 'fixed' | 'absolute';
}>`
  position: ${({ $position }) => $position};
  z-index: ${({ $zIndex }) => $zIndex};
  background: #ffffff;
  border-radius: 12px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const DayPickerWrapper = styled.div`
  padding: 10px;

  .rdp-root {
    --rdp-accent-color: #0057ff;
    --rdp-accent-background-color: #e8f0ff;
    --rdp-today-color: #0057ff;
    --rdp-day-height: 36px;
    --rdp-day-width: 36px;
    --rdp-day_button-height: 34px;
    --rdp-day_button-width: 34px;
    --rdp-day_button-border-radius: 6px;
  }

  .rdp-selected .rdp-day_button {
    background-color: #0057ff;
    color: #ffffff;
    font-weight: 700;
    border-color: transparent;
  }

  .rdp-day:not(.rdp-selected):not(.rdp-disabled) .rdp-day_button:hover {
    background-color: #e8f0ff;
    color: #0057ff;
  }

  .rdp-month_caption,
  .rdp-caption_label {
    font-weight: 700;
    color: #374151;
    font-size: 14px;
  }

  .rdp-weekday {
    color: #6b7280;
    font-size: 12px;
    font-weight: 600;
  }

  .rdp-day_button {
    font-size: 13px;
    color: #374151;
  }
`;
