import styled from 'styled-components';

export default function MainHeader() {
  return (
    <HeaderContainer>
      <Logo src="" alt="Finn Logo" />
    </HeaderContainer>
  );
}

export const HEADER_HEIGHT = 80;

const HeaderContainer = styled.header``;
const Logo = styled.img``;
