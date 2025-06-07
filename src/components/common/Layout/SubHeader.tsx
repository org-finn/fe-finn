import styled from 'styled-components';

export default function SubHeader() {
  return (
    <HeaderContainer>
      <Item>메인</Item>
      <Item>뉴스보드</Item>
      <Item>FinnGPT</Item>
      <Item>포트폴리오</Item>
    </HeaderContainer>
  );
}

export const HEADER_HEIGHT = 80;

const HeaderContainer = styled.div`
  display: flex;
`;
const Item = styled.div``;
