import { Outlet, useLocation } from 'react-router-dom';
import { Suspense, useRef, useState } from 'react';
import styled from 'styled-components';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import MainHeader from './MainHeader';
import Footer from './Footer';
import useScrollToTop from '@/hooks/useScrollToTop';
import ErrorComponent from './Error';
import Loading from './Loading';
import MainSkeleton from '@/components/Main/MainSkeleton';
import TickerSkeleton from '@/components/Ticker/TickerSkeleton';
import SubHeader from './SubHeader';
import useIsTouchDevice from '@/hooks/useIsTouchDevice';
import useScrollDirection from '@/hooks/useScrollDirection';

export default function MainLayout() {
  const isTouch = useIsTouchDevice();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(true);
  const subHeaderRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollDirection = useScrollDirection();

  const renderSkeleton = () => {
    if (location.pathname === '/') {
      return <MainSkeleton />;
    }
    if (location.pathname.startsWith('/ticker')) {
      return <TickerSkeleton />;
    }
    return <Loading size={50} />;
  };

  useScrollToTop();
  const handleHeaderClick = () => {
    if (isTouch) {
      if (!menuOpen) setMenuOpen(true);
    }
  };
  const showHeader = scrollDirection === 'up' || scrollDirection === null;

  // 바깥 클릭 시 메뉴 닫기

  return (
    <Wrapper>
      <MainHeader ref={headerRef} onClick={handleHeaderClick} />
      <SubHeader visible={showHeader} ref={subHeaderRef} />
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
