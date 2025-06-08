import { Outlet, useLocation } from 'react-router-dom';
import { Suspense, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import MainHeader from './MainHeader';
import Footer from './Footer';
import useScrollToTop from '@/hooks/useScrollToTop';
import ErrorComponent from './Error';
import Loading from './Loading';
import MainSkeleton from '@/components/Main/MainSkeleton';
import StockSkeleton from '@/components/Stock/StockSkeleton';
import SubHeader from './SubHeader';
import useIsTouchDevice from '@/hooks/useIsTouchDevice';
import useScrollDirection from '@/hooks/useScrollDirection';

export default function MainLayout() {
  const isTouch = useIsTouchDevice();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [forceClose, setForceClose] = useState(false);
  const subHeaderRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollDirection = useScrollDirection();

  const renderSkeleton = () => {
    if (location.pathname === '/') {
      return <MainSkeleton />;
    }
    if (location.pathname.startsWith('/stock')) {
      return <StockSkeleton />;
    }
    return <Loading size={50} />;
  };

  useScrollToTop();
  const handleMouseEnter = () => {
    if (!isTouch) setIsHover(true);
  };
  const handleMouseLeave = () => {
    if (!isTouch) setIsHover(false);
  };
  const handleHeaderClick = () => {
    if (isTouch) {
      setForceClose(false);
      if (!menuOpen) setMenuOpen(true);
    }
  };
  const showHeader = isTouch
    ? !forceClose && (menuOpen || scrollDirection === 'up')
    : isHover || scrollDirection === 'up';

  useEffect(() => {
    if (scrollDirection === 'down') setForceClose(false);
  }, [scrollDirection]);

  // 바깥 클릭 시 메뉴 닫기
  useEffect(() => {
    if (!showHeader) return;
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (!isTouch) return;
      if (
        (subHeaderRef.current &&
          subHeaderRef.current.contains(event.target as Node)) ||
        (headerRef.current && headerRef.current.contains(event.target as Node))
      ) {
        return;
      }
      setMenuOpen(false);
      setForceClose(true);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [showHeader, isTouch]);

  return (
    <Wrapper>
      <MainHeader
        ref={headerRef}
        onClick={handleHeaderClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <SubHeader
        visible={showHeader}
        ref={subHeaderRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <InnerWrapper>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary FallbackComponent={ErrorComponent} onReset={reset}>
              <Suspense fallback={renderSkeleton()}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </InnerWrapper>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: min(100%, 700px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
