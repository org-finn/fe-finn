import styled from 'styled-components';
import { Text } from '../common/typography/Text';
import { PredictionDataResponse } from '@/types';
import { Link } from 'react-router-dom';
import useGetVariant from '@/hooks/useGetVariant';
import useGetSignSymbol from '@/hooks/useGetSignSymbol';
import useIsMobile from '@/hooks/useIsMobile';
import { getABTestVariant } from '@/utils/abTest';
import KeywordView from './ABTest/KeywordView';
import ArticleView from './ABTest/ArticleView';
import GraphView from './ABTest/GraphView';

export default function TickerItem({ item }: { item: PredictionDataResponse }) {
  const isMobile = useIsMobile();
  const getVariant = useGetVariant(item.sentiment);
  const getSignSymbol = useGetSignSymbol(item.sentiment);
  const variant = getABTestVariant();

  return (
    <Wrapper to={`/ticker/${item.tickerId}`}>
      {variant === 'article' && isMobile ? (
        <MobileArticleLayout>
          <MobileTickerInfo>
            <Text size="s" weight="bold">
              {item.tickerCode}
            </Text>
            <Text size="xxs" weight="normal" variant="grey">
              {item.shortCompanyName}
            </Text>
          </MobileTickerInfo>
          <ArticleView
            predictionStrategy={item.predictionStrategy}
            sentiment={item.sentiment}
            articleTitles={item.articleTitles}
          />
        </MobileArticleLayout>
      ) : (
        <>
          <LeftSection>
            <TickerInfo>
              <Text size={isMobile ? 's' : 'm'} weight="bold">
                {item.tickerCode}
              </Text>
              <Text
                size={isMobile ? 'xxs' : 'xs'}
                weight="normal"
                variant="grey"
              >
                {item.shortCompanyName}
              </Text>
            </TickerInfo>
            <SignalInfo>
              {getSignSymbol && (
                <span
                  style={{
                    marginRight: '4px',
                    fontSize: isMobile ? '12px' : '14px',
                  }}
                >
                  {getSignSymbol}
                </span>
              )}
              <Text
                size={isMobile ? 'xxs' : 'xs'}
                weight="bold"
                variant={getVariant}
              >
                {item.predictionStrategy} 신호
              </Text>
            </SignalInfo>
          </LeftSection>

          <PriceInfo>
            {variant === 'keyword' && (
              <KeywordView
                positiveKeywords={item.positiveKeywords}
                negativeKeywords={item.negativeKeywords}
              />
            )}
            {variant === 'article' && (
              <ArticleView
                predictionStrategy={item.predictionStrategy}
                sentiment={item.sentiment}
                articleTitles={item.articleTitles}
              />
            )}
            {variant === 'graph' && <GraphView graphData={item.graphData} />}
          </PriceInfo>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled(Link)`
  display: flex;
  justify-content: space-between;
  padding: 14px 32px;
  color: black;
  background-color: #f7faff;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: #f4f7fc;
  }

  @media screen and (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  @media screen and (max-width: 768px) {
    gap: 12px;
  }
`;

const TickerInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
`;

const SignalInfo = styled.div`
  display: flex;
  align-items: center;
`;

const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  flex: 1;
`;

const MobileArticleLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 12px;
`;

const MobileTickerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
`;
