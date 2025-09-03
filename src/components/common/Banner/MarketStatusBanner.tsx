import styled from 'styled-components';
import { MdOutlineToday } from 'react-icons/md';
import { Paragraph } from '@/components/common/typography/Paragraph';
import { useGetTodayMarketStatus } from '@/api/hooks/useGetTodayMarketStatus';

export default function MarketStatusBanner() {
  const { data: isHoliday, isLoading, error } = useGetTodayMarketStatus();

  if (isLoading) return null;
  if (error) return null;
  if (!isHoliday) return null;

  return (
    <BannerWrapper>
      <BannerContent>
        <IconWrapper>
          <MdOutlineToday size={20} />
        </IconWrapper>
        <TextContainer>
          <Paragraph size="s" weight="normal" variant="black">
            오늘은 휴장일이에요!
          </Paragraph>
        </TextContainer>
      </BannerContent>
    </BannerWrapper>
  );
}

const BannerWrapper = styled.div`
  border-radius: 16px;
  padding: 16px 20px;
  background: linear-gradient(135deg, #f8f9fe 0%, #f0f4ff 100%);
  border: 1px solid #e6efff;
  margin-bottom: 36px;
  margin-top: -16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease-in-out;
`;

const BannerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
`;
