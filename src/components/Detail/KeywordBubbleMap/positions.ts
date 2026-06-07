import {
  SVG_CENTER_Y,
  SVG_WIDTH,
  MAX_ORBIT,
  NEWS_MAX_CHARS,
  NEWS_ORBIT,
  NEWS_PILL_HEIGHT,
  NEWS_PILL_WIDTH,
  PILL_HEIGHT,
} from './constants';

// count=5 공통 각도: 하단 쌍을 45°/135°로 넓혀 좌하/우하 간격 확보 (cf - 정오각형은 72° 간격)
const ANGLES_5 = [
  -Math.PI / 2,
  -Math.PI / 10,
  Math.PI / 4,
  (3 * Math.PI) / 4,
  (11 * Math.PI) / 10,
];

export function pillWidth(text: string): number {
  return Math.max(56, text.length * 13 + 20);
}

export function calcBubblePositions(count: number, cx: number, orbitR: number) {
  const angles =
    count === 5
      ? ANGLES_5
      : Array.from(
          { length: count },
          (_, i) => ((2 * Math.PI) / Math.max(count, 1)) * i - Math.PI / 2
        );
  return angles.map((angle) => ({
    x: cx + orbitR * Math.cos(angle),
    y: SVG_CENTER_Y + orbitR * Math.sin(angle),
  }));
}

/**
 * 뉴스 카드 궤도 반경 동적 계산
 * - 수평 최솟값: pill 너비/2 + gap + 뉴스 카드 너비/2 (pill과 뉴스 카드가 겹치지 않도록)
 * - 상한: SVG 세로 경계를 벗어나지 않도록 제한
 */
export function calcNewsOrbit(keywordText: string): number {
  const pw = pillWidth(keywordText);
  const minByHoriz = pw / 2 + NEWS_PILL_WIDTH / 2 + 12;
  const maxByBounds = SVG_CENTER_Y - NEWS_PILL_HEIGHT / 2 - 2;
  return Math.min(maxByBounds, Math.max(NEWS_ORBIT, minByHoriz));
}

export function calcNewsPositions(count: number, orbit: number) {
  const cx = SVG_WIDTH / 2;
  if (count === 0) return [];
  if (count === 1) {
    return [{ x: cx, y: SVG_CENTER_Y + orbit * Math.sin(Math.PI / 6) }];
  }
  if (count === 2) {
    const r = Math.PI / 6;
    return [
      { x: cx - orbit * Math.cos(r), y: SVG_CENTER_Y + orbit * Math.sin(r) },
      { x: cx + orbit * Math.cos(r), y: SVG_CENTER_Y + orbit * Math.sin(r) },
    ];
  }
  if (count === 3) {
    const r = Math.PI / 6;
    return [
      { x: cx, y: SVG_CENTER_Y - orbit * Math.sin(r) },
      { x: cx - orbit * Math.cos(r), y: SVG_CENTER_Y + orbit * Math.sin(r) },
      { x: cx + orbit * Math.cos(r), y: SVG_CENTER_Y + orbit * Math.sin(r) },
    ];
  }
  if (count === 4) {
    return Array.from({ length: 4 }, (_, i) => {
      const angle = -Math.PI / 4 + (Math.PI / 2) * i;
      return {
        x: cx + orbit * Math.cos(angle),
        y: SVG_CENTER_Y + orbit * Math.sin(angle),
      };
    });
  }
  return ANGLES_5.map((angle) => ({
    x: cx + orbit * Math.cos(angle),
    y: SVG_CENTER_Y + orbit * Math.sin(angle),
  }));
}

export function clampOrbit(sectionWidth: number): number {
  return Math.max(
    0,
    Math.min(
      MAX_ORBIT,
      sectionWidth / 2 - PILL_HEIGHT - 8,
      SVG_CENTER_Y - PILL_HEIGHT - 14
    )
  );
}

export function truncateTitle(title: string): string {
  return title.length > NEWS_MAX_CHARS
    ? title.slice(0, NEWS_MAX_CHARS - 1) + '…'
    : title;
}
