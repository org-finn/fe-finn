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
        <MdOutlineToday size={24} />
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
  border-radius: 12px;
  padding: 16px 20px;
  background: #f6f6f6;
  margin-bottom: 36px;
  margin-top: -16px;
`;

const BannerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;
