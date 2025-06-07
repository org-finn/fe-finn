import { Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import styled from 'styled-components';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import MainHeader from './MainHeader';
import Footer from './Footer';
import useScrollToTop from '../../../hooks/useScrollToTop';
import ErrorComponent from './Error';
import Loading from './Loading';
import MainSkeleton from '../../Main/MainSkeleton';
import StockSkeleton from '../../Stock/StockSkeleton';

export default function MainLayout() {
  const location = useLocation();
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
  return (
    <Wrapper>
      <MainHeader />
      {/* <SubHeader /> */}
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
