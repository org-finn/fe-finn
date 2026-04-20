import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { useGetTickerDetail } from '@/api/hooks/useGetTickerDetail';
import { useGetRealGraph, RealGraphPeriod } from '@/api/hooks/useGetRealGraph';
import { useGetRealTimePrice } from '@/api/hooks/useGetRealTimePrice';
import { useGetArticleSummaryTicker } from '@/api/hooks/useGetArticleSummaryTicker';
import { useQueryClient } from '@tanstack/react-query';

import { usePutFavoriteTicker } from '@/api/hooks/usePutFavoriteTicker';
import { useLiveChart } from '@/hooks/detail/useLiveChart';
import { useArticleRotation } from '@/hooks/detail/useArticleRotation';
import useIsMobile from '@/hooks/useIsMobile';
import useAuth from '@/hooks/useAuth';

import Loading from '@/components/common/Layout/Loading';
import SummaryModal from '@/components/Detail/SummaryModal';
import LoginModal from '@/components/common/Modal/LoginModal';
import TickerHeader from '@/components/Detail/TickerHeader';
import TickerPriceSection from '@/components/Detail/TickerPriceSection';
import ChartSection from '@/components/Detail/ChartSection';
import ArticleSection from '@/components/Detail/ArticleSection';

export default function DetailPage() {
  const { id } = useParams() as { id: string };
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isAuthenticated } = useAuth();

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
  const {
    data: realTimePriceResponse,
    isLoading: realTimePriceLoading,
    error: realTimePriceError,
  } = useGetRealTimePrice({ tickerId: id, enabled: isAuthenticated });
  const { data: summaryResponse } = useGetArticleSummaryTicker(id);

  const tickerData = tickerResponse?.content;
  const realGraphData = realGraphResponse?.content;
  const realTimePriceData = realTimePriceResponse?.content;
  const summaryData = summaryResponse?.content ?? null;
  const articles = tickerData?.detailData.article;

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

  const isLoading = tickerLoading || realGraphLoading || realTimePriceLoading;
  const error = tickerError || realGraphError || realTimePriceError;

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

  return (
    <>
      <Wrapper>
        <SummaryModal
          isOpen={showSummaryModal}
          onClose={() => setShowSummaryModal(false)}
          summaryData={summaryData}
        />
        <TickerHeader
          tickerData={tickerData}
          isMobile={isMobile}
          isFavorite={isFavorite}
          onLikeClick={handleLikeClick}
        />
        <TickerPriceSection tickerData={tickerData} isMobile={isMobile} />
        <ChartSection
          isMobile={isMobile}
          period={period}
          isLiveMode={isLiveMode}
          showRefreshTooltip={showRefreshTooltip}
          realGraphData={realGraphData}
          tickerData={tickerData}
          liveChartData={liveChartData}
          onRefresh={handleRefresh}
          onPeriodChange={handlePeriodChange}
          onLiveMode={handleLiveMode}
          onShowSummary={() => setShowSummaryModal(true)}
        />
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

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
