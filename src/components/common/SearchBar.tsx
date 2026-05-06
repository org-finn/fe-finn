import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import { useGetSearchPreview } from '@/api/hooks/useGetSearchPreview';
import { ArticleDataResponse } from '@/types';

interface SearchBarProps {
  type?: 'ticker' | 'all';
  onTickerSearchResult?: (tickerCodes: string[] | null) => void;
  onArticleSearchResult?: (articles: ArticleDataResponse[] | null) => void;
}

export default function SearchBar({
  type = 'all',
  onTickerSearchResult,
  onArticleSearchResult,
}: SearchBarProps) {
  const [keyword, setKeyword] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: searchPreviewData, isLoading: searchPreviewLoading } =
    useGetSearchPreview(keyword);

  const tickerList = useMemo(
    () => searchPreviewData?.content.tickerSearchList ?? [],
    [searchPreviewData]
  );
  const articleList = useMemo(
    () =>
      type === 'all'
        ? (searchPreviewData?.content?.articleSearchList ?? [])
        : [],
    [searchPreviewData, type]
  );

  const resultCount =
    type === 'ticker'
      ? tickerList.length
      : tickerList.length + articleList.length;

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

  useEffect(() => {
    if (!onTickerSearchResult) return;
    if (keyword.length < 2) {
      onTickerSearchResult(null);
    } else {
      onTickerSearchResult(tickerList.map((t) => t.tickerCode));
    }
  }, [tickerList, keyword, onTickerSearchResult]);

  useEffect(() => {
    if (!onArticleSearchResult) return;
    if (keyword.length < 2) {
      onArticleSearchResult(null);
    } else {
      onArticleSearchResult(articleList);
    }
  }, [articleList, keyword, onArticleSearchResult]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    setSelectedIndex(-1);

    if (onTickerSearchResult) return;

    if (value.length >= 2) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isDropdownOpen || resultCount === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < resultCount - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < resultCount) {
          if (type === 'ticker' || selectedIndex < tickerList.length) {
            handleSelectTicker(tickerList[selectedIndex]);
          } else {
            handleSelectArticle(articleList[selectedIndex - tickerList.length]);
          }
        }
        break;
      case 'Escape':
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelectTicker = (ticker: (typeof tickerList)[0]) => {
    setKeyword(ticker.shortCompanyName);
    setIsDropdownOpen(false);
    setSelectedIndex(-1);
    navigate(`/ticker/${ticker.tickerId}`);
  };

  const handleSelectArticle = (article: ArticleDataResponse) => {
    setIsDropdownOpen(false);
    setSelectedIndex(-1);
    navigate(`/news/${article.articleId}`);
  };

  const placeholder =
    type === 'all' ? '검색어를 입력해주세요!' : '종목을 검색해주세요!';

  return (
    <SearchContainer ref={searchBarRef}>
      <Wrapper>
        <Input
          type="text"
          placeholder={placeholder}
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() =>
            !onTickerSearchResult &&
            keyword.length >= 2 &&
            setIsDropdownOpen(true)
          }
        />
        <SearchIcon
          size={24}
          color="#363636"
          role="button"
          aria-label="search icon"
          onClick={() =>
            type === 'all' && keyword.length >= 2 && setIsDropdownOpen(false)
          }
        />
      </Wrapper>

      {isDropdownOpen && !onTickerSearchResult && (
        <DropdownContainer>
          {searchPreviewLoading ? (
            <DropdownItem>검색 중...</DropdownItem>
          ) : type === 'ticker' ? (
            tickerList.length > 0 ? (
              tickerList.map((ticker, index) => (
                <DropdownItem
                  key={ticker.tickerId}
                  $isSelected={index === selectedIndex}
                  onClick={() => handleSelectTicker(ticker)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <IoIosSearch size={16} color="#939393" />
                  <TickerInfo>
                    <CompanyName>{ticker.shortCompanyName}</CompanyName>
                    <TickerCode>{ticker.tickerCode}</TickerCode>
                  </TickerInfo>
                </DropdownItem>
              ))
            ) : keyword.length >= 2 ? (
              <DropdownItem>검색 결과가 없습니다.</DropdownItem>
            ) : null
          ) : (
            <>
              {tickerList.map((ticker, index) => (
                <DropdownItem
                  key={ticker.tickerId}
                  $isSelected={index === selectedIndex}
                  onClick={() => handleSelectTicker(ticker)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <IoIosSearch size={16} color="#939393" />
                  <TickerInfo>
                    <CompanyName>{ticker.shortCompanyName}</CompanyName>
                    <TickerCode>{ticker.tickerCode}</TickerCode>
                  </TickerInfo>
                </DropdownItem>
              ))}
              {articleList.map((article, index) => (
                <DropdownItem
                  key={article.articleId}
                  $isSelected={tickerList.length + index === selectedIndex}
                  onClick={() => handleSelectArticle(article)}
                  onMouseEnter={() =>
                    setSelectedIndex(tickerList.length + index)
                  }
                >
                  <IoIosSearch size={16} color="#939393" />
                  <ArticleTitle>{article.title}</ArticleTitle>
                </DropdownItem>
              ))}
              {tickerList.length === 0 &&
                articleList.length === 0 &&
                keyword.length >= 2 && (
                  <DropdownItem>검색 결과가 없습니다.</DropdownItem>
                )}
            </>
          )}
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
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
  background-color: ${(props) =>
    props.$isSelected ? '#f5f5f5' : 'transparent'};
  &:hover {
    background-color: #f5f5f5;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TickerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CompanyName = styled.span`
  font-weight: 600;
  color: #333;
`;

const TickerCode = styled.span`
  font-size: 12px;
  color: #666;
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
`;
const ArticleTitle = styled.div`
  flex: 1;
  min-width: 0;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
