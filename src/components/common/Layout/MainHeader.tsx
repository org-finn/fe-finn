import styled from 'styled-components';
import Logo from '@/assets/images/Articker.png';
import { forwardRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginModal from '@/components/common/Modal/LoginModal';

type HeaderProps = {
  onClick: () => void;
};
export const MainHeader = forwardRef<HTMLDivElement, HeaderProps>(
  (props, ref) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
      <HeaderContainer ref={ref} onClick={props.onClick}>
        <LogoWrapper
          src={Logo}
          alt="Articker Logo"
          onClick={() => navigate('/')}
        />
        <ButtonContainer>
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
          <LoginModal currentPath={location.pathname}>
            {(openModal) => (
              <LoginButton onClick={openModal}>로그인</LoginButton>
            )}
          </LoginModal>
        </ButtonContainer>
      </HeaderContainer>
    );
  }
);
export default MainHeader;
export const HEADER_HEIGHT = 60;

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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media screen and (max-width: 768px) {
    gap: 12px;
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

const LoginButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  background-color: #e7f0fe;
  color: #2757aa;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #dae5f8;
  }

  @media screen and (max-width: 768px) {
    padding: 6px 14px;
  }
`;
