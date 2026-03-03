import styled from 'styled-components';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import NoItem from '@/components/common/Layout/NoItem';
import TickerCard from '@/components/common/TickerCard';
import { useGetFavoriteTickers } from '@/api/hooks/useGetFavoriteTickers';
import { usePutFavoriteTicker } from '@/api/hooks/usePutFavoriteTicker';

export default function FavoriteTickerSection() {
  const { data } = useGetFavoriteTickers();
  const tickers = data?.content.tickers ?? [];
  const listRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const { mutate: putFavoriteTicker } = usePutFavoriteTicker();

  const handleToggleLike = (tickerCode: string, isFavorite: boolean) => {
    putFavoriteTicker(
      { tickerCode, mode: isFavorite ? 'on' : 'off' },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ['favoriteTickers'] }),
      }
    );
  };

  const scrollList = (direction: 'left' | 'right') => {
    if (!listRef.current) return;

    const someWidth = 400;
    const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
    const remainingScroll =
      direction === 'left'
        ? scrollLeft
        : scrollWidth - clientWidth - scrollLeft;
    const scrollAmount =
      direction === 'left'
        ? -Math.min(someWidth, remainingScroll)
        : Math.min(someWidth, remainingScroll);

    listRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <SectionContainer>
      {tickers.length === 0 ? (
        <NoItem message="관심 종목이 없어요!" height={200} />
      ) : (
        <>
          {tickers.length > 3 && (
            <ArrowButton
              aria-label="관심 종목 스크롤 왼쪽"
              onClick={() => scrollList('left')}
              className="left-arrow"
              direction="left"
            >
              <GrPrevious size={40} />
            </ArrowButton>
          )}
          <ListContainer ref={listRef}>
            {tickers.map((ticker) => (
              <TickerCard
                key={ticker.tickerId}
                tickerCode={ticker.tickerCode}
                shortCompanyName={ticker.shortCompanyName}
                predictionStrategy={ticker.predictionStrategy}
                sentiment={ticker.sentiment}
                graphData={ticker.graphData}
                isSelected={true}
                onToggleLike={handleToggleLike}
              />
            ))}
          </ListContainer>
          {tickers.length > 3 && (
            <ArrowButton
              aria-label="관심 종목 스크롤 오른쪽"
              onClick={() => scrollList('right')}
              className="right-arrow"
              direction="right"
            >
              <GrNext size={40} />
            </ArrowButton>
          )}
        </>
      )}
    </SectionContainer>
  );
}

const SectionContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  overflow: visible;
  width: 100%;
`;

const ListContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    flex-shrink: 0;
    scroll-snap-align: start;
  }
`;

const ArrowButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  height: 100%;
  color: transparent;
  background: none;
  border: none;
  cursor: pointer;
  transition:
    color 0.3s,
    background 0.3s;
  padding: 0;
  z-index: 9;

  &:hover {
    color: white;
    background: ${({ direction }) =>
      direction === 'left'
        ? 'linear-gradient(to right, rgba(200, 200, 200, 0.5), transparent 90%)'
        : 'linear-gradient(to left, rgba(200, 200, 200, 0.5), transparent 90%)'};
  }

  &.left-arrow {
    left: 0;
  }

  &.right-arrow {
    right: 0;
  }

  svg {
    ${({ direction }) =>
      direction === 'left' ? 'padding-right: 20px' : 'padding-left: 20px'};
  }

  @media screen and (max-width: 768px) {
    svg {
      height: 20px;
    }
  }
`;
