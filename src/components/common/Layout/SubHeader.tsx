import { forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HEADER_HEIGHT } from './MainHeader';

type SubHeaderProps = {
  visible: boolean;
  onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
};

export const SubHeader = forwardRef<HTMLDivElement, SubHeaderProps>(
  ({ visible, onMouseEnter, onMouseLeave }, ref) => {
    const location = useLocation();

    const isActive = (path: string) => {
      if (path.startsWith('http')) return false;
      if (path === '/') {
        return (
          location.pathname === '/' || location.pathname.startsWith('/stock')
        );
      }
      return location.pathname === path;
    };
    return (
      <HeaderContainer
        $show={visible}
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Item aria-label="header-home" to="/" $isActive={isActive('/')}>
          홈
        </Item>
        <Item aria-label="header-news" to="/news" $isActive={isActive('/news')}>
          뉴스보드
        </Item>
        <Item
          aria-label="header-finngpt"
          to="/finngpt"
          $isActive={isActive('/finngpt')}
        >
          FinnGPT
        </Item>
        <Item aria-label="header-my" to="/my" $isActive={isActive('/my')}>
          포트폴리오
        </Item>
      </HeaderContainer>
    );
  }
);

export default SubHeader;

const HeaderContainer = styled.div<{ $show: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: sticky;
  padding: 6px 0px;
  top: ${HEADER_HEIGHT}px;
  z-index: 99;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.7);
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  pointer-events: ${({ $show }) => ($show ? 'auto' : 'none')};
  transition:
    transform 0.3s,
    opacity 0.3s;
  transform: ${({ $show }) => ($show ? 'translateY(0)' : 'translateY(-100%)')};
`;
const Item = styled(Link)<{ $isActive: boolean }>`
  width: 100%;
  color: ${({ $isActive }) => ($isActive ? '#0057ff' : 'black')};
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
  transition: 0.2s;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  padding: 10px;
  &:hover {
    color: #0057ff;
    font-weight: bold;
  }
`;
