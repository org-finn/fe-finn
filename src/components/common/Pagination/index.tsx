import { useMemo } from 'react';
import styled from 'styled-components';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  itemsPerPage,
}: PaginationProps) {
  const shouldShowPagination = useMemo(() => {
    if (itemsPerPage && totalItems) {
      return totalItems > itemsPerPage;
    }
    return true;
  }, [itemsPerPage, totalItems]);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return [...new Array(totalPages)].map((_, i) => i + 1);
    }

    let start = Math.max(currentPage - 2, 1);
    const end = Math.min(start + 4, totalPages);

    if (end === totalPages) {
      start = Math.max(totalPages - 4, 1);
    }

    return [...new Array(end - start + 1)].map((_, i) => start + i);
  }, [currentPage, totalPages]);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
    }
  };

  if (!shouldShowPagination || totalPages <= 1) {
    return null;
  }

  return (
    <PaginationContainer>
      <ArrowButton
        aria-label="페이지네이션 왼쪽"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
      >
        <IoChevronBack size={20} />
      </ArrowButton>
      {pageNumbers.map((pageNum) => (
        <PageNumber
          key={pageNum}
          aria-label={`${pageNum}_페이지`}
          onClick={() => handlePageChange(pageNum)}
          $active={pageNum === currentPage}
        >
          {pageNum}
        </PageNumber>
      ))}
      <ArrowButton
        aria-label="페이지네이션 오른쪽"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
      >
        <IoChevronForward size={20} />
      </ArrowButton>
    </PaginationContainer>
  );
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
`;

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  background: transparent;
  color: #333333;
  box-shadow: none;
  border: none;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  svg {
    display: block;
  }
`;

interface PageNumberProps {
  $active: boolean;
}

const PageNumber = styled.button<PageNumberProps>`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: ${(props) => {
    if (!props.$active) return '#979797';
    return 'black';
  }};
  cursor: pointer;

  ${(props) =>
    props.$active &&
    `
    background: #dee5f1;
  `}

  &:hover {
    background: ${(props) => {
      return props.$active ? '#dee5f1' : '#eef3fb';
    }};
    color: ${(props) => {
      if (!props.$active) return '#626262';
      return 'black';
    }};
  }
`;
