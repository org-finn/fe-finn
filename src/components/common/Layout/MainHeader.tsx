import styled from 'styled-components';
import Logo from '@/assets/images/Articker.png';
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
        <LogoWrapper
          src={Logo}
          alt="Articker Logo"
          onClick={() => navigate('/')}
        />
        <NavButton
          onClick={() =>
            window.open(
              'https://docs.google.com/forms/d/e/1FAIpQLSeXlCSj7un7J5cnisJRaQE_RTpEqSjcnDhVHv3ZrCOBj5-I3A/viewform?usp=dialog',
              '_blank'
            )
          }
        >
          피드백 남기기
        </NavButton>
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
  justify-content: space-between;
  padding: 0 20px;

  @media screen and (max-width: 768px) {
    width: 90%;
    padding: 0 16px;
  }
`;
const LogoWrapper = styled.img`
  width: 100px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 80px;
  }
`;
const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #292929;

  &:hover {
    color: #2d70d3;
  }
`;
