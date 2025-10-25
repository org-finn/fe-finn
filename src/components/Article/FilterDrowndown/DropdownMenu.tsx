import { useMemo, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { RiMenuFill } from 'react-icons/ri';
import styled from 'styled-components';
import DropdownItem from './DropdownItem';
import useClickOutside from '@/hooks/useClickOutside';

interface Option {
  label: string;
  id: string;
}

export interface DropdownMenuProps {
  options: Option[];
  onChange: (value: { id: string }) => void;
  placeholder?: string;
  width: number;
  selectedOptions?: string[];
}

export default function DropdownMenu({
  options,
  onChange,
  placeholder = '',
  width,
  selectedOptions,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  useClickOutside([dropdownRef as React.RefObject<HTMLElement>], () => {
    setIsOpen(false);
  });

  const filteredOptions = useMemo(() => {
    try {
      return (
        options?.filter((option) => {
          if (!searchTerm) return true; // 모든 항목 반환
          return option?.label
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
        }) || []
      );
    } catch {
      return [];
    }
  }, [options, searchTerm]);

  const handleOptionClick = (option: Option) => {
    onChange({
      id: option.id,
    });
    setIsOpen(false);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleDropdownToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setSearchTerm('');
    } else {
      setIsOpen(true);
      setSearchTerm('');
    }
  };

  return (
    <DropdownContainer ref={dropdownRef} $width={width}>
      <DropdownButton
        aria-label="종목 선택 드롭다운"
        $isOpen={isOpen}
        onClick={handleDropdownToggle}
      >
        <RiMenuFill color="#2d70d3" />
        {placeholder}
      </DropdownButton>
      {isOpen && (
        <DropdownMenuContainer>
          <SearchInputContainer>
            <SearchInput
              placeholder="검색"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <SearchIcon />
          </SearchInputContainer>
          <ItemContainer>
            {filteredOptions.map((option) => (
              <DropdownItem
                key={option.label}
                label={option.label}
                onClick={() => handleOptionClick(option)}
                isFiltered={selectedOptions?.includes(option.id) || false}
              />
            ))}
          </ItemContainer>
        </DropdownMenuContainer>
      )}
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div<{ $width: number }>`
  position: relative;
  height: 100%;
  width: ${({ $width }) => `${$width}px`};
  align-items: center;
  align-content: center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const DropdownButton = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  height: 100%;
  border: none;
  background-color: ${({ $isOpen }) => ($isOpen ? '#f2f2f2' : '#ffffff')};
  border-radius: 10px;
  display: flex;
  color: #333333;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  gap: 4px;

  &:hover {
    background-color: #f2f2f2;
    border: none;
  }

  @media screen and (max-width: 768px) {
    padding: 0px 4px;
    font-size: 14px;
    color: grey;
    gap: 0px;
  }
`;

const DropdownMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 150%;
  background: #ffffff;
  color: #333333;
  box-shadow: 0 3px 12px 0 rgb(0 0 0/0.15);
  padding: 2px;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 4px;
  max-height: 300px;
  z-index: 101;

  @media screen and (max-width: 768px) {
    top: 110%;
    width: 220%;
    margin-top: 2px;
    border-radius: 4px;
    overflow-x: hidden;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;

  @media screen and (max-width: 768px) {
    padding: 2px 4px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  outline: none;
  font-size: 16px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    background: transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0px;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #a3a3a3;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    right: 12px;
    width: 14px;
    height: 14px;
  }
`;

const ItemContainer = styled.div`
  width: 100%;
  max-height: 250px;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    max-height: 100%;
  }
`;
