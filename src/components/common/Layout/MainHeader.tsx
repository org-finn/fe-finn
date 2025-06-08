import styled from 'styled-components';
import Logo from '@/assets/images/Finn.png';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
  onClick: () => void;
};
export const MainHeader = forwardRef<HTMLDivElement, HeaderProps>(
  (props, ref) => {
    const navigate = useNavigate();
    return (
      <HeaderContainer
        ref={ref}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onClick={props.onClick}
      >
        <LogoWrapper src={Logo} alt="Finn Logo" onClick={() => navigate('/')} />
      </HeaderContainer>
    );
  }
);
export default MainHeader;
export const HEADER_HEIGHT = 50;

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  height: ${HEADER_HEIGHT}px;
  width: 100%;
  display: flex;
  align-items: center;
`;
const LogoWrapper = styled.img`
  width: 60px;
  cursor: pointer;
`;
