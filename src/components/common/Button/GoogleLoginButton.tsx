import styled from 'styled-components';
import GoogleLogoIcon from '@/assets/images/g-logo.png';

interface GoogleLoginButtonProps {
  onLogin: () => void;
  text?: 'signin_with' | 'signup_with' | 'continue_with';
}

export default function GoogleLoginButton({
  onLogin,
  text,
}: GoogleLoginButtonProps) {
  const buttonText =
    text === 'signin_with'
      ? 'Google 계정으로 로그인'
      : text === 'signup_with'
        ? 'Google 계정으로 가입'
        : 'Google 계정으로 계속';

  return (
    <Button onClick={onLogin} aria-label={buttonText}>
      <GoogleLogo src={GoogleLogoIcon} alt="Google logo" />
      <ButtonText>{buttonText}</ButtonText>
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  height: 56px;
  background: #ffffff;
  border: 1px solid #747775;
  border-radius: 4px;
  cursor: pointer;
  padding: 0 12px;
  gap: 10px;

  @media screen and (max-width: 768px) {
    height: 40px;
  }
`;

const GoogleLogo = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const ButtonText = styled.span`
  font-family: 'Roboto';
  font-size: 20px;
  color: #1f1f1f;
  line-height: 20px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
