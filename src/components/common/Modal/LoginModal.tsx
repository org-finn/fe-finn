import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

import Logo from '@/assets/images/Articker.png';
import GoogleLoginButton from '../Button/GoogleLoginButton';

interface LoginModalProps {
  children: (openModal: () => void) => React.ReactNode;
  currentPath: string;
}

export default function LoginModal({ children, currentPath }: LoginModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleGoogleLogin = () => {
    // to-do: 백에서 프론트로 리다이렉트 해줄 때, 복원 로직(getItem) 필요
    localStorage.setItem('redirectPath', currentPath);
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: `${window.location.origin}/callback`,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'online',
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  };

  return (
    <>
      {children && children(openModal)}
      {isOpen &&
        ReactDOM.createPortal(
          <ModalOverlay onClick={closeModal}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
              <CloseButton aria-label="로그인 창닫기" onClick={closeModal}>
                ✕
              </CloseButton>
              <ContentWrapper>
                <LogoSection>
                  <LogoImage src={Logo} alt="아티커 로고" />
                  <LogoSubtitle>뉴스와 함께 성장하는 나의 자산</LogoSubtitle>
                </LogoSection>
                <LoginSection>
                  <LoginMessageWrapper>
                    <DividerLine />
                    <LoginMessage>간편 로그인</LoginMessage>
                    <DividerLine />
                  </LoginMessageWrapper>
                  <GoogleLoginButton
                    onLogin={handleGoogleLogin}
                    text="continue_with"
                  />
                </LoginSection>
              </ContentWrapper>
            </ModalContainer>
          </ModalOverlay>,
          document.body
        )}
    </>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 330px;
  height: 230px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.24);
  padding: 48px 40px;

  @media screen and (max-width: 768px) {
    width: 264px;
    height: 184px;
    padding: 36px 24px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #999;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    color: #333;
  }

  @media screen and (max-width: 768px) {
    width: 28px;
    height: 28px;
    font-size: 18px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 16px;

  @media screen and (max-width: 768px) {
    gap: 28px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;

  @media screen and (max-width: 768px) {
    gap: 12px;
  }
`;

const LogoImage = styled.img`
  width: 140px;

  @media screen and (max-width: 768px) {
    width: 120px;
  }
`;

const LogoSubtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin: 0;
  line-height: 1.5;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const LoginSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;

  @media screen and (max-width: 768px) {
    gap: 30px;
  }
`;

const LoginMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;

  @media screen and (max-width: 768px) {
    gap: 12px;
  }
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: #e0e0e0;
`;

const LoginMessage = styled.p`
  font-size: 14px;
  color: #999;
  font-weight: 400;
  margin: 0;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
