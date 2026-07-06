import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useGetTickerDetail } from '@/api/hooks/useGetTickerDetail';
import { useGetRealGraph, RealGraphPeriod } from '@/api/hooks/useGetRealGraph';
import { useGetTickerKeywords } from '@/api/hooks/useGetTickerKeywords';
import { useGetRealTimePrice } from '@/api/hooks/useGetRealTimePrice';
import { useGetArticleSummaryTicker } from '@/api/hooks/useGetArticleSummaryTicker';
import { useQueryClient } from '@tanstack/react-query';

import { usePutFavoriteTicker } from '@/api/hooks/usePutFavoriteTicker';
import { useLiveChart } from '@/hooks/detail/useLiveChart';
import { useArticleRotation } from '@/hooks/detail/useArticleRotation';
import useIsMobile from '@/hooks/useIsMobile';
import useAuth from '@/hooks/useAuth';

import { getDetailABVariant } from '@/utils/abTest';
import { formatMonthDay } from '@/utils/formatDate';

import Loading from '@/components/common/Layout/Loading';
import { Paragraph } from '@/components/common/typography/Paragraph';
import { Text } from '@/components/common/typography/Text';
import LoginModal from '@/components/common/Modal/LoginModal';
import ArticleSection from '@/components/Detail/ArticleSection';
import KeywordBubbleMap from '@/components/Detail/KeywordBubbleMap';
import { mockKeywordsData } from '@/mocks/mockKeywordsData';

import SummaryModal from '@/components/Detail/ABTest/GroupA/SummaryModal';
import TickerHeaderA from '@/components/Detail/ABTest/GroupA/TickerHeader';
import TickerPriceSectionA from '@/components/Detail/ABTest/GroupA/TickerPriceSection';
import ChartSectionA from '@/components/Detail/ABTest/GroupA/ChartSection';

import DailySummary from '@/components/Detail/ABTest/GroupB/DailySummary';
import TickerHeaderB from '@/components/Detail/ABTest/GroupB/TickerHeader';
import TickerPriceSectionB from '@/components/Detail/ABTest/GroupB/TickerPriceSection';
import ChartSectionB from '@/components/Detail/ABTest/GroupB/ChartSection';
import DatePickerButton from '@/components/common/DatePickerButton';

export default function DetailPage() {
  const variant = getDetailABVariant();

  // 임시 확인용 - 추후 제거 예정
  const keywordCount = 5;
  const articleCount = 5;
  const titleLength = 20;

  const { id } = useParams() as { id: string };
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isAuthenticated } = useAuth();

  const today = new Date().toLocaleDateString('sv-SE');

  const [selectedDate, setSelectedDate] = useState(today);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [summaryEnabled, setSummaryEnabled] = useState(
    () => sessionStorage.getItem('today_summary_enabled') === 'true'
  );

  const [period, setPeriod] = useState<RealGraphPeriod>('2W');
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [showRefreshTooltip, setShowRefreshTooltip] = useState(false);
  const scrollPositionRef = useRef(0);
  const queryClient = useQueryClient();

  const {
    data: tickerResponse,
    isLoading: tickerLoading,
    error: tickerError,
  } = useGetTickerDetail(id);
  const {
    data: realGraphResponse,
    isLoading: realGraphLoading,
    error: realGraphError,
  } = useGetRealGraph({ tickerId: id, period });
  const { data: realTimePriceResponse, isLoading: realTimePriceLoading } =
    useGetRealTimePrice({
      tickerId: id,
      enabled: isAuthenticated && isLiveMode,
    });
  const { data: summaryResponse, isLoading: summaryLoading } =
    useGetArticleSummaryTicker(
      id,
      selectedDate,
      variant === 'A' || (summaryEnabled && isAuthenticated)
    );

  const handleRequestSummary = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
    sessionStorage.setItem('today_summary_enabled', 'true');
    setSummaryEnabled(true);
  };
  const { data: keywordsResponse, isLoading: isKeywordsLoading } =
    useGetTickerKeywords(
      id,
      selectedDate,
      keywordCount,
      articleCount,
      titleLength
    );

  const tickerData = tickerResponse?.content;
  const realGraphData = realGraphResponse?.content;
  const realTimePriceData = realTimePriceResponse?.content;
  const summaryData = summaryResponse?.content ?? null;
  const articles = tickerData?.detailData.article;

  const rawKeywords = useMemo(
    () => keywordsResponse?.content?.keywords ?? [],
    [keywordsResponse]
  );
  const isKeywordsEmpty = !isKeywordsLoading && rawKeywords.length === 0;

  const keywords = isKeywordsEmpty ? mockKeywordsData : rawKeywords;
  const positiveKeywords = keywords.filter((k) => k.sentiment === 1);
  const negativeKeywords = keywords.filter((k) => k.sentiment !== 1);
  const total = positiveKeywords.length + negativeKeywords.length;
  const positiveRatio =
    total > 0 ? (positiveKeywords.length / total) * 100 : 50;
  const negativeRatio = 100 - positiveRatio;

  const [isFavorite, setIsFavorite] = useState(false);
  const { mutate: putFavoriteTicker } = usePutFavoriteTicker();

  useEffect(() => {
    if (tickerData?.isFavorite !== undefined) {
      setIsFavorite(tickerData.isFavorite);
    }
  }, [tickerData?.isFavorite]);

  const handleLikeClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      if (!isAuthenticated) {
        setShowLoginModal(true);
        return;
      }
      const nextFavorite = !isFavorite;
      setIsFavorite(nextFavorite);
      putFavoriteTicker(
        {
          tickerCode: tickerData?.tickerCode ?? '',
          mode: nextFavorite ? 'on' : 'off',
        },
        {
          onError: () => {
            setIsFavorite(!nextFavorite);
            alert('좋아요 처리에 실패했습니다. 다시 시도해주세요.');
          },
        }
      );
    },
    [isFavorite, isAuthenticated, tickerData?.tickerCode, putFavoriteTicker]
  );
  const { liveChartData } = useLiveChart(
    id,
    isLiveMode,
    isAuthenticated,
    realTimePriceData
  );
  const { currentIndex } = useArticleRotation(articles);

  const isLoading =
    tickerLoading || realGraphLoading || (isLiveMode && realTimePriceLoading);
  const error = tickerError;

  const handleRefresh = () => {
    if (isLiveMode) {
      queryClient.invalidateQueries({
        queryKey: ['real-time-price', { tickerId: id }],
      });
    } else {
      queryClient.invalidateQueries({
        queryKey: ['real-graph', { period }],
      });
    }
    setShowRefreshTooltip(true);
    setTimeout(() => setShowRefreshTooltip(false), 3000);
  };

  const handlePeriodChange = (newPeriod: RealGraphPeriod) => {
    scrollPositionRef.current = window.scrollY;
    setPeriod(newPeriod);
    setIsLiveMode(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
      });
    });
  };

  const handleLiveMode = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    scrollPositionRef.current = window.scrollY;
    setIsLiveMode(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
      });
    });
  };

  if (isLoading) return <Loading />;
  if (error)
    return (
      <ErrorMessage>데이터를 불러오는 중 오류가 발생했습니다.</ErrorMessage>
    );
  if (!tickerData)
    return <ErrorMessage>주식 정보를 찾을 수 없습니다.</ErrorMessage>;

  const commonChartProps = {
    isMobile,
    period,
    isLiveMode,
    showRefreshTooltip,
    tickerData,
    liveChartData,
    onRefresh: handleRefresh,
    onPeriodChange: handlePeriodChange,
    onLiveMode: handleLiveMode,
  };

  const commonHeaderProps = {
    tickerData,
    isMobile,
    isFavorite,
    onLikeClick: handleLikeClick,
  };

  const keywordBubbleMap = (variant: 'A' | 'B') => (
    <>
      <SummarySectionHeader>
        <Paragraph size={isMobile ? 'xs' : 's'} weight="bold">
          <Text size={isMobile ? 'xs' : 's'} weight="bold" variant="#2d70d3">
            {formatMonthDay(selectedDate)}
          </Text>
          의 뉴스 요약
        </Paragraph>
        {variant === 'B' && (
          <DatePickerButton
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            popupZIndex={9}
          />
        )}
      </SummarySectionHeader>
      <KeywordBubbleMap
        positiveRatio={positiveRatio}
        negativeRatio={negativeRatio}
        positiveKeywords={positiveKeywords}
        negativeKeywords={negativeKeywords}
        date={selectedDate}
        isEmpty={isKeywordsEmpty}
        onNewsClick={(articleId) => navigate(`/news/${articleId}`)}
      />
    </>
  );

  return (
    <>
      <Wrapper $variant={variant}>
        {variant === 'A' ? (
          <>
            <SummaryModal
              isOpen={showSummaryModal}
              onClose={() => setShowSummaryModal(false)}
              summaryData={summaryData}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
            <TickerHeaderA {...commonHeaderProps} />
            <TickerPriceSectionA tickerData={tickerData} isMobile={isMobile} />
            {realGraphData ? (
              <ChartSectionA
                {...commonChartProps}
                realGraphData={realGraphData}
                onShowSummary={() => {
                  if (!isAuthenticated) {
                    setShowLoginModal(true);
                    return;
                  }
                  setShowSummaryModal(true);
                }}
              />
            ) : realGraphError ? (
              <ErrorMessage>
                차트 데이터를 불러오는 중 오류가 발생했습니다.
              </ErrorMessage>
            ) : null}
            {keywordBubbleMap('A')}
          </>
        ) : (
          <>
            <TickerHeaderB {...commonHeaderProps} />
            <TickerPriceSectionB tickerData={tickerData} isMobile={isMobile} />
            {keywordBubbleMap('B')}
            <DailySummary
              summaryData={summaryData}
              isEnabled={summaryEnabled && isAuthenticated}
              isLoading={summaryLoading}
              onRequestSummary={handleRequestSummary}
            />
            {realGraphData ? (
              <ChartSectionB
                {...commonChartProps}
                realGraphData={realGraphData}
              />
            ) : realGraphError ? (
              <ErrorMessage>
                차트 데이터를 불러오는 중 오류가 발생했습니다.
              </ErrorMessage>
            ) : null}
          </>
        )}
        {articles && articles.length > 0 && (
          <ArticleSection
            articles={articles}
            currentIndex={currentIndex}
            tickerCode={tickerData.tickerCode}
            isMobile={isMobile}
          />
        )}
      </Wrapper>
      {showLoginModal && (
        <LoginModal
          immediateOpen={true}
          currentPath={location.pathname}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
}

const Wrapper = styled.div<{ $variant: 'A' | 'B' }>`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: ${({ $variant }) => ($variant === 'B' ? '24px' : '20px')};
  padding: 16px 0;

  @media screen and (max-width: 768px) {
    width: 84%;
    gap: 18px;
    padding: 12px 0;
  }
`;

const SummarySectionHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
`;

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #e74c3c;
`;
