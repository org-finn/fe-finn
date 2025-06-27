import styled from 'styled-components';
import { Text } from '../typography/Text';

export default function Footer() {
  return (
    <FooterContainer>
      <FooterSection>
        <FooterInfo>
          <CompanyInfo>
            <Text size="xxs" weight="normal" variant="#979797">
              ⓒ 2025. Finn Co. All rights reserved.
            </Text>
            <Text size="xxs" weight="normal" variant="#979797">
              대구광역시 북구 대학로 80
            </Text>
            <Text size="xxs" weight="normal" variant="#979797">
              finn.official@gmail.com
            </Text>
          </CompanyInfo>
        </FooterInfo>
      </FooterSection>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  background-color: #f6f6f6;
  width: 100%;
  padding: 24px 30px;
  box-sizing: border-box;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FooterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
