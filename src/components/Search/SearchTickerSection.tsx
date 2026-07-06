import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { GrPrevious, GrNext } from 'react-icons/gr';
import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Text } from '@/components/common/typography/Text';
import { useGetTickerSearchList } from '@/api/hooks/useGetTickerSearchList';
import { usePutFavoriteTicker } from '@/api/hooks/usePutFavoriteTicker';
import useIsMobile from '@/hooks/useIsMobile';
import NoItem from '@/components/common/Layout/NoItem';
import TickerCard from '@/components/common/TickerCard';

type SearchTickerSectionProps = {
  keyword: string;
};

const MORE_PRICE_DATA = [
  476.99, 474, 472.12, 478.43, 487.12, 493.79, 507.49, 510.18, 503.29, 511.14,
  508.68,
];
const MORE_CHART_DATA = MORE_PRICE_DATA.map((price, index) => ({
  x: index,
  y: price,
}));

export default function SearchTickerSection({
  keyword,
}: SearchTickerSectionProps) {
  const [hoverKey, setHoverKey] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const displayCount = isMobile ? 2 : 3;

  const { data: searchData, isLoading } = useGetTickerSearchList(keyword);
  const { mutate: putFavoriteTicker } = usePutFavoriteTicker();
  const tickers = searchData?.content.tickerSearchList ?? [];
  const hasMore = searchData?.content.isMore ?? false;

  const handleToggleLike = (tickerCode: string, isFavorite: boolean) => {
    putFavoriteTicker(
      { tickerCode, mode: isFavorite ? 'on' : 'off' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['favoriteTickers'] });
          queryClient.invalidateQueries({ queryKey: ['tickerSearchList'] });
        },
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

  const moreChartOptions: ApexOptions = {
    chart: {
      sparkline: { enabled: true },
      animations: {
        enabled: true,
        dynamicAnimation: { enabled: true },
      },
    },
    colors: ['gray'],
    stroke: { curve: 'smooth', width: isMobile ? 2 : 2.6 },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['gray'],
        inverseColors: false,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    markers: { size: 0 },
    yaxis: {
      show: false,
      min: Math.min(...MORE_PRICE_DATA),
      max: Math.max(...MORE_PRICE_DATA),
    },
    tooltip: { enabled: false },
  };

  return (
    <SectionContainer>
      <SectionHeader>
        <Text size={isMobile ? 's' : 'm'} weight="bold">
          관련 종목
        </Text>
      </SectionHeader>
      {tickers.length === 0 ? (
        <NoItem
          message={isLoading ? '검색 중...' : '관련 종목이 없어요!'}
          height={200}
        />
      ) : (
        <ListWrapper>
          {tickers.length >= displayCount && (
            <ArrowButton
              aria-label="관련 종목 스크롤 왼쪽"
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
                key={ticker.tickerCode}
                tickerId={ticker.tickerId}
                tickerCode={ticker.tickerCode}
                shortCompanyName={ticker.shortCompanyName}
                predictionStrategy={ticker.predictionStrategy}
                sentiment={ticker.sentiment}
                graphData={
                  ticker.graphData ?? { isMarketOpen: false, priceData: [] }
                }
                isSelected={ticker.isFavorite ?? false}
                onToggleLike={handleToggleLike}
              />
            ))}
            {hasMore && (
              <MoreBtn
                type="button"
                aria-label={`${keyword} 관련 종목 더 보기`}
                onMouseEnter={() => setHoverKey((k) => k + 1)}
                onClick={() =>
                  navigate(`/ticker?filter=${encodeURIComponent(keyword)}`)
                }
              >
                <MoreImageContainer>
                  <MoreGraphWrapper>
                    <ApexChart
                      key={hoverKey}
                      options={moreChartOptions}
                      series={[{ name: 'Price', data: MORE_CHART_DATA }]}
                      type="area"
                      height={isMobile ? 36 : 44}
                    />
                  </MoreGraphWrapper>
                </MoreImageContainer>
                <MoreInfoContainer>
                  <Text size={isMobile ? 'xs' : 's'} weight="bold">
                    관련 종목
                  </Text>
                  <Text
                    size={isMobile ? 'xxs' : 'xs'}
                    weight="bold"
                    variant="grey"
                  >
                    더 보기
                  </Text>
                </MoreInfoContainer>
              </MoreBtn>
            )}
          </ListContainer>
          {tickers.length >= displayCount && (
            <ArrowButton
              aria-label="관련 종목 스크롤 오른쪽"
              onClick={() => scrollList('right')}
              className="right-arrow"
              direction="right"
            >
              <GrNext size={40} />
            </ArrowButton>
          )}
        </ListWrapper>
      )}
    </SectionContainer>
  );
}

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
`;

const ListWrapper = styled.div`
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

const MoreBtn = styled.button`
  box-sizing: content-box;
  border: none;
  width: 154px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
  border-radius: 8px;
  background-color: #f7faff;
  padding: 12px;
  cursor: pointer;

  &:hover {
    background-color: #f4f7fc;
  }

  @media screen and (max-width: 768px) {
    width: 120px;
  }
`;

const MoreImageContainer = styled.div`
  width: 150px;
  aspect-ratio: 3 / 2;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 4px;

  @media screen and (max-width: 768px) {
    width: 116px;
  }
`;

const MoreGraphWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  > div {
    padding: 0 !important;
    height: 100% !important;
  }
`;

const MoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 8px;
  width: 100%;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 18px 0;

  @media screen and (max-width: 768px) {
    padding: 16px 0;
  }
`;
