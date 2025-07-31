import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import { useGetStockSearch } from '@/api/hooks/useGetStockSearch';

export default function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: searchData, isLoading } = useGetStockSearch(keyword);
  const stockList = searchData?.content || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    setSelectedIndex(-1);

    if (value.length >= 2) {
      // 2글자부터 드롭다운 열기
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isDropdownOpen || stockList.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < stockList.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectStock(stockList[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelectStock = (stock: (typeof stockList)[0]) => {
    setKeyword(stock.companyName);
    setIsDropdownOpen(false);
    setSelectedIndex(-1);

    navigate(`/stock/${stock.stockId}`);
  };

  return (
    <SearchContainer ref={searchBarRef}>
      <Wrapper>
        <Input
          type="text"
          placeholder="종목을 검색해주세요!"
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => keyword.length >= 2 && setIsDropdownOpen(true)}
        />
        <SearchIcon
          size={24}
          color="#363636"
          role="button"
          aria-label="search icon"
        />
      </Wrapper>

      {isDropdownOpen && (
        <DropdownContainer>
          {isLoading ? (
            <DropdownItem>검색 중...</DropdownItem>
          ) : stockList.length > 0 ? (
            stockList.map((stock, index) => (
              <DropdownItem
                key={stock.stockId}
                $isSelected={index === selectedIndex}
                onClick={() => handleSelectStock(stock)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <StockInfo>
                  <CompanyName>{stock.companyName}</CompanyName>
                  <StockCode>{stock.stockCode}</StockCode>
                </StockInfo>
                <FullCompanyName>{stock.fullCompanyName}</FullCompanyName>
              </DropdownItem>
            ))
          ) : keyword.length >= 2 ? (
            <DropdownItem>검색 결과가 없습니다.</DropdownItem>
          ) : null}
        </DropdownContainer>
      )}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  border-radius: 32px;
  border: 1px solid #787878;
  background-color: none;
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  padding: 12px 14px;
  z-index: 11;

  &::placeholder {
    color: #939393;
  }
  &:focus {
    outline: none;
  }
`;
const SearchIcon = styled(IoIosSearch)`
  padding: 0px 14px;
  cursor: pointer;
  z-index: 11;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 18px;
  left: 0;
  right: 0;
  padding: 10px 0px;
  width: calc(100% + 0.2px);
  border: 1px solid #787878;
  border-top: none;
  border-radius: 0 0 32px 32px;
  background-color: white;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
  margin-top: 4px;
`;

const DropdownItem = styled.div<{ $isSelected?: boolean }>`
  font-size: 14px;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
  &:hover {
    background-color: #f5f5f5;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const StockInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const CompanyName = styled.span`
  font-weight: 600;
  color: #333;
`;

const StockCode = styled.span`
  font-size: 12px;
  color: #666;
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
`;

const FullCompanyName = styled.div`
  font-size: 12px;
  color: #999;
`;
