import { useState, useEffect, useCallback, useRef } from 'react';
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

import Loading from '@/components/common/Layout/Loading';
import LoginModal from '@/components/common/Modal/LoginModal';
import ArticleSection from '@/components/Detail/ArticleSection';
import KeywordBubbleMap from '@/components/Detail/KeywordBubbleMap';

import SummaryModal from '@/components/Detail/ABTest/GroupA/SummaryModal';
import TickerHeaderA from '@/components/Detail/ABTest/GroupA/TickerHeader';
import TickerPriceSectionA from '@/components/Detail/ABTest/GroupA/TickerPriceSection';
import ChartSectionA from '@/components/Detail/ABTest/GroupA/ChartSection';

import DailySummary from '@/components/Detail/ABTest/GroupB/DailySummary';
import TickerHeaderB from '@/components/Detail/ABTest/GroupB/TickerHeader';
import TickerPriceSectionB from '@/components/Detail/ABTest/GroupB/TickerPriceSection';
import ChartSectionB from '@/components/Detail/ABTest/GroupB/ChartSection';

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
  const { data: summaryResponse } = useGetArticleSummaryTicker(
    id,
    selectedDate
  );
  const { data: keywordsResponse } = useGetTickerKeywords(
    id,
    today,
    keywordCount,
    articleCount,
    titleLength
  );

  const tickerData = tickerResponse?.content;
  const realGraphData = realGraphResponse?.content;
  const realTimePriceData = realTimePriceResponse?.content;
  const summaryData = summaryResponse?.content ?? null;
  const articles = tickerData?.detailData.article;

  const keywords = keywordsResponse?.content?.keywords ?? [];
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

  const keywordBubbleMap = (variant: 'A' | 'B') =>
    keywords.length > 0 && (
      <KeywordBubbleMap
        positiveRatio={positiveRatio}
        negativeRatio={negativeRatio}
        positiveKeywords={positiveKeywords}
        negativeKeywords={negativeKeywords}
        date={today}
        onNewsClick={(articleId) => navigate(`/news/${articleId}`)}
        {...(variant === 'B' && { onDateChange: setSelectedDate })}
      />
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
                onShowSummary={() => setShowSummaryModal(true)}
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
            <DailySummary summaryData={summaryData} />
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

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #e74c3c;
`;
