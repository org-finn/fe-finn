import styled from 'styled-components';
import Logo from '@/assets/images/Finn.png';

export default function MainHeader() {
  return (
    <HeaderContainer>
      <LogoWrapper src={Logo} alt="Finn Logo" />
    </HeaderContainer>
  );
}

export const HEADER_HEIGHT = 80;

const HeaderContainer = styled.header`
  width: 100%;
`;
const LogoWrapper = styled.img`
  width: 60px;
`;
