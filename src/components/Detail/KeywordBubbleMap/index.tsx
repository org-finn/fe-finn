import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoDocumentTextOutline } from 'react-icons/io5';
import styled from 'styled-components';
import type { KeywordsWithArticleResponse } from '@/types';
import {
  SVG_CENTER_Y,
  SVG_HEIGHT,
  SVG_WIDTH,
  NEG_FILL,
  NEG_STROKE,
  NEG_TEXT,
  EMPTY_FILL,
  EMPTY_STROKE,
  EMPTY_TEXT,
  NEWS_ICON_SIZE,
  NEWS_ORBIT,
  NEWS_PILL_HEIGHT,
  NEWS_PILL_RADIUS,
  NEWS_PILL_WIDTH,
  PILL_HEIGHT,
  PILL_RADIUS,
  POS_FILL,
  POS_STROKE,
  POS_TEXT,
} from './constants';
import {
  calcBubblePositions,
  calcNewsOrbit,
  calcNewsPositions,
  clampOrbit,
  pillWidth,
  truncateTitle,
} from './positions';
import { Paragraph } from '@/components/common/typography/Paragraph';
import { Text } from '@/components/common/typography/Text';
import useIsMobile from '@/hooks/useIsMobile';
import DatePickerButton from '@/components/common/DatePickerButton';
import { formatMonthDay } from '@/utils/formatDate';

type Props = {
  positiveRatio: number;
  negativeRatio: number;
  positiveKeywords: KeywordsWithArticleResponse[];
  negativeKeywords: KeywordsWithArticleResponse[];
  onNewsClick: (articleId: string) => void;
  date: string;
  onDateChange?: (date: string) => void;
};

export default function KeywordBubbleMap({
  positiveRatio,
  negativeRatio,
  positiveKeywords,
  negativeKeywords,
  onNewsClick,
  date,
  onDateChange,
}: Props) {
  const isMobile = useIsMobile();
  const uid = useRef(Math.random().toString(36).slice(2, 8)).current;
  const [selected, setSelected] = useState<KeywordsWithArticleResponse | null>(
    null
  );

  const posW = (positiveRatio / 100) * SVG_WIDTH;
  const negW = (negativeRatio / 100) * SVG_WIDTH;
  const posCX = posW / 2;
  const negCX = posW + negW / 2;

  const posPos = calcBubblePositions(
    positiveKeywords.length,
    posCX,
    clampOrbit(posW)
  );
  const negPos = calcBubblePositions(
    negativeKeywords.length,
    negCX,
    clampOrbit(negW)
  );

  const displayedArticles = selected?.articles.slice(0, 5) ?? [];
  const newsOrbit = selected ? calcNewsOrbit(selected.keyword) : NEWS_ORBIT;
  const newsPos = calcNewsPositions(displayedArticles.length, newsOrbit);

  const isPos = (selected?.sentiment ?? 0) === 1;
  const drillStroke = isPos ? POS_STROKE : NEG_STROKE;
  const drillAccent = isPos ? POS_TEXT : NEG_TEXT;

  const close = () => setSelected(null);

  const posShadowId = `${uid}-sp`;
  const negShadowId = `${uid}-sn`;
  const newsShadowId = `${uid}-ns`;

  return (
    <>
      <BubbleMapHeader>
        <Paragraph size={isMobile ? 'xs' : 's'} weight="bold">
          <Text size={isMobile ? 'xs' : 's'} weight="bold" variant="#2d70d3">
            {formatMonthDay(date)}
          </Text>
          의 뉴스 요약
        </Paragraph>
        {onDateChange && (
          <DatePickerButton
            selectedDate={date}
            onDateChange={onDateChange}
            popupZIndex={9}
          />
        )}
      </BubbleMapHeader>
      <Container onClick={close}>
        <Background $ratio={positiveRatio} />
        <DateText>{date}</DateText>

        <Svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: 'Pretendard, sans-serif' }}
        >
          <defs>
            <filter
              id={posShadowId}
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feDropShadow
                dx="2"
                dy="2"
                stdDeviation="2.5"
                floodColor="rgba(237,202,206,0.35)"
              />
            </filter>
            <filter
              id={negShadowId}
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feDropShadow
                dx="2"
                dy="2"
                stdDeviation="2.5"
                floodColor="rgba(169,204,253,0.35)"
              />
            </filter>

            <filter
              id={newsShadowId}
              x="-20%"
              y="-40%"
              width="140%"
              height="180%"
            >
              <feDropShadow
                dx="0"
                dy="3"
                stdDeviation="5"
                floodColor="rgba(0,0,0,0.10)"
              />
            </filter>
          </defs>

          <AnimatePresence>
            {selected !== null && (
              <motion.rect
                key="dim"
                x={0}
                y={0}
                width={SVG_WIDTH}
                height={SVG_HEIGHT}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                fill={
                  isPos ? 'rgba(255,245,247,0.94)' : 'rgba(245,250,255,0.94)'
                }
                style={{ cursor: 'default' }}
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
              />
            )}
          </AnimatePresence>

          {positiveKeywords.map((kw, i) => {
            const { x, y } = posPos[i];
            const pw = pillWidth(kw.keyword);
            const isSelected = selected?.keyword === kw.keyword;
            const isDimmed = selected !== null && !isSelected;
            const hasArticles = kw.articles.length > 0;
            const fill = hasArticles ? POS_FILL : EMPTY_FILL;
            const stroke = hasArticles ? POS_STROKE : EMPTY_STROKE;
            const textFill = hasArticles ? POS_TEXT : EMPTY_TEXT;

            return (
              <motion.g
                key={kw.keyword}
                role="button"
                tabIndex={isDimmed ? -1 : 0}
                animate={{
                  x: isSelected ? SVG_WIDTH / 2 - x : 0,
                  y: isSelected ? SVG_CENTER_Y - y : 0,
                  opacity: isDimmed ? 0 : 1,
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                whileHover={
                  selected === null && hasArticles ? { scale: 1.08 } : {}
                }
                whileFocus={
                  selected === null && hasArticles ? { scale: 1.08 } : {}
                }
                style={{
                  transformOrigin: `${x}px ${y}px`,
                  cursor:
                    selected === null && hasArticles ? 'pointer' : 'default',
                  outline: 'none',
                }}
                onClick={(e) => {
                  if (selected === null && hasArticles) {
                    e.stopPropagation();
                    setSelected(kw);
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    selected === null &&
                    hasArticles &&
                    (e.key === 'Enter' || e.key === ' ')
                  ) {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelected(kw);
                  }
                }}
              >
                <rect
                  x={x - pw / 2}
                  y={y - PILL_HEIGHT / 2}
                  width={pw}
                  height={PILL_HEIGHT}
                  rx={PILL_RADIUS}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={1}
                  filter={`url(#${posShadowId})`}
                />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={13}
                  fontWeight="600"
                  fill={textFill}
                  style={{ pointerEvents: 'none' }}
                >
                  {kw.keyword}
                </text>
              </motion.g>
            );
          })}

          {negativeKeywords.map((kw, i) => {
            const { x, y } = negPos[i];
            const pw = pillWidth(kw.keyword);
            const isSelected = selected?.keyword === kw.keyword;
            const isDimmed = selected !== null && !isSelected;
            const hasArticles = kw.articles.length > 0;
            const fill = hasArticles ? NEG_FILL : EMPTY_FILL;
            const stroke = hasArticles ? NEG_STROKE : EMPTY_STROKE;
            const textFill = hasArticles ? NEG_TEXT : EMPTY_TEXT;

            return (
              <motion.g
                key={kw.keyword}
                role="button"
                tabIndex={isDimmed ? -1 : 0}
                animate={{
                  x: isSelected ? SVG_WIDTH / 2 - x : 0,
                  y: isSelected ? SVG_CENTER_Y - y : 0,
                  opacity: isDimmed ? 0 : 1,
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                whileHover={
                  selected === null && hasArticles ? { scale: 1.08 } : {}
                }
                whileFocus={
                  selected === null && hasArticles ? { scale: 1.08 } : {}
                }
                style={{
                  transformOrigin: `${x}px ${y}px`,
                  cursor:
                    selected === null && hasArticles ? 'pointer' : 'default',
                  outline: 'none',
                }}
                onClick={(e) => {
                  if (selected === null && hasArticles) {
                    e.stopPropagation();
                    setSelected(kw);
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    selected === null &&
                    hasArticles &&
                    (e.key === 'Enter' || e.key === ' ')
                  ) {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelected(kw);
                  }
                }}
              >
                <rect
                  x={x - pw / 2}
                  y={y - PILL_HEIGHT / 2}
                  width={pw}
                  height={PILL_HEIGHT}
                  rx={PILL_RADIUS}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={1}
                  filter={`url(#${negShadowId})`}
                />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={13}
                  fontWeight="600"
                  fill={textFill}
                  style={{ pointerEvents: 'none' }}
                >
                  {kw.keyword}
                </text>
              </motion.g>
            );
          })}

          <AnimatePresence>
            {selected !== null &&
              displayedArticles.map((article, i) => {
                const { x, y } = newsPos[i];
                const title = truncateTitle(article.title);
                const pl = x - NEWS_PILL_WIDTH / 2;
                const pt = y - NEWS_PILL_HEIGHT / 2;

                return (
                  <motion.g
                    key={`news-${article.articleId}`}
                    role="button"
                    tabIndex={0}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.75 }}
                    transition={{
                      duration: 0.22,
                      delay: 0.12 + i * 0.05,
                      ease: 'easeOut',
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileFocus={{ scale: 1.04 }}
                    style={{
                      cursor: 'pointer',
                      transformOrigin: `${x}px ${y}px`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onNewsClick(article.articleId);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        onNewsClick(article.articleId);
                      }
                    }}
                  >
                    <rect
                      x={pl}
                      y={pt}
                      width={NEWS_PILL_WIDTH}
                      height={NEWS_PILL_HEIGHT}
                      rx={NEWS_PILL_RADIUS}
                      fill="white"
                      stroke={drillStroke}
                      strokeWidth={1}
                      filter={`url(#${newsShadowId})`}
                    />
                    <svg
                      x={pl + 8}
                      y={y - NEWS_ICON_SIZE / 2}
                      width={NEWS_ICON_SIZE}
                      height={NEWS_ICON_SIZE}
                      style={{ pointerEvents: 'none', overflow: 'visible' }}
                    >
                      <IoDocumentTextOutline
                        width={NEWS_ICON_SIZE}
                        height={NEWS_ICON_SIZE}
                        color={drillAccent}
                      />
                    </svg>
                    <text
                      x={pl + 8 + NEWS_ICON_SIZE + 5}
                      y={y + 0.5}
                      dominantBaseline="middle"
                      fontSize={11}
                      fontWeight="500"
                      fill="#374151"
                      style={{ pointerEvents: 'none' }}
                    >
                      {title}
                    </text>
                  </motion.g>
                );
              })}
          </AnimatePresence>
        </Svg>
      </Container>
    </>
  );
}

const BubbleMapHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 1;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
`;

const Background = styled.div<{ $ratio: number }>`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    #fff0f4 ${({ $ratio }) => Math.max(0, $ratio - 15)}%,
    #f4f8ff ${({ $ratio }) => Math.min(100, $ratio + 15)}%
  );
`;

const DateText = styled.span`
  position: absolute;
  bottom: 10px;
  right: 14px;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.28);
  z-index: 1;
  pointer-events: none;
`;

const Svg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;
