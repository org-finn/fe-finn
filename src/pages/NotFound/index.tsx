import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useIsMobile from '@/hooks/useIsMobile';
import Button from '@/components/common/Button';
import { Paragraph } from '@/components/common/typography/Paragraph';

export default function NotFound() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const handleHome = () => {
    navigate('/');
  };
  return (
    <Wrapper>
      <TextWrapper>
        <Paragraph size={isMobile ? 'l' : 'xl'} weight="bold">
          페이지를 찾을 수 없어요 🥲
        </Paragraph>
        <Paragraph size={isMobile ? 's' : 'm'} weight="normal">
          요청한 페이지가 존재하지 않거나 삭제되었어요.
        </Paragraph>
      </TextWrapper>
      <StyledButton
        aria-label="NotFound 홈으로"
        variant="blackOutline"
        onClick={handleHome}
      >
        홈으로 이동하기
      </StyledButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 40px;
  gap: 60px;

  @media screen and (max-width: 768px) {
    gap: 40px;
    padding-bottom: 20px;
  }
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  gap: 20px;
  white-space: pre-line;
  line-height: 26px;

  @media screen and (max-width: 768px) {
    width: 80%;
    margin-top: 30px;
  }
`;

const StyledButton = styled(Button)`
  width: 30%;
  @media screen and (max-width: 768px) {
    width: fit-content;
    padding: 20px;
  }
`;
