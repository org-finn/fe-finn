import {
  SVG_CENTER_Y,
  SVG_WIDTH,
  MAX_ORBIT,
  NEWS_ICON_SIZE,
  NEWS_MAX_CHARS,
  NEWS_ORBIT,
  NEWS_PILL_HEIGHT,
  NEWS_PILL_WIDTH,
  PILL_HEIGHT,
} from './constants';

const ANGLES_5 = [
  -Math.PI / 2,
  -Math.PI / 10,
  Math.PI / 4,
  (3 * Math.PI) / 4,
  (11 * Math.PI) / 10,
];

export function pillWidth(text: string): number {
  return Math.max(56, text.length * 10 + 24);
}

export function newsPillWidth(title: string): number {
  let textWidth = 0;
  for (const ch of title) {
    const code = ch.codePointAt(0) ?? 0;
    const isKorean =
      (code >= 0xac00 && code <= 0xd7a3) || (code >= 0x4e00 && code <= 0x9fff);
    textWidth += isKorean ? 10 : 6;
  }
  return Math.max(100, NEWS_ICON_SIZE + textWidth + 8);
}

function getBubbleAngles(count: number): number[] {
  return count === 5
    ? ANGLES_5
    : Array.from(
        { length: count },
        (_, i) => ((2 * Math.PI) / Math.max(count, 1)) * i - Math.PI / 2
      );
}

export function calcBubblePositions(count: number, cx: number, orbitR: number) {
  const angles = getBubbleAngles(count);
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
export function calcNewsOrbit(
  keywordText: string,
  maxNewsPillWidth = NEWS_PILL_WIDTH
): number {
  const pw = pillWidth(keywordText);
  // 여백값 12, 2도 나중에 상수로 빼서 관리하기
  const minByHoriz = pw / 2 + maxNewsPillWidth / 2 + 12;
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
    const angle = Math.PI / 6;
    return [
      {
        x: cx - orbit * Math.cos(angle),
        y: SVG_CENTER_Y + orbit * Math.sin(angle),
      },
      {
        x: cx + orbit * Math.cos(angle),
        y: SVG_CENTER_Y + orbit * Math.sin(angle),
      },
    ];
  }
  if (count === 3) {
    const angle = Math.PI / 6;
    return [
      { x: cx, y: SVG_CENTER_Y - orbit * Math.sin(angle) },
      {
        x: cx - orbit * Math.cos(angle),
        y: SVG_CENTER_Y + orbit * Math.sin(angle),
      },
      {
        x: cx + orbit * Math.cos(angle),
        y: SVG_CENTER_Y + orbit * Math.sin(angle),
      },
    ];
  }
  if (count === 4) {
    const angle = Math.PI / 6;
    return [
      {
        x: cx - orbit * Math.cos(angle),
        y: SVG_CENTER_Y - orbit * Math.sin(angle),
      },
      {
        x: cx + orbit * Math.cos(angle),
        y: SVG_CENTER_Y - orbit * Math.sin(angle),
      },
      {
        x: cx - orbit * Math.cos(angle),
        y: SVG_CENTER_Y + orbit * Math.sin(angle),
      },
      {
        x: cx + orbit * Math.cos(angle),
        y: SVG_CENTER_Y + orbit * Math.sin(angle),
      },
    ];
  }
  const bottomAngle = Math.PI / 5;
  return [
    { x: cx, y: SVG_CENTER_Y - orbit * 0.8 },
    {
      x: cx + orbit * Math.cos(Math.PI / 10),
      y: SVG_CENTER_Y - orbit * Math.sin(Math.PI / 10),
    },
    {
      x: cx + orbit * Math.cos(bottomAngle),
      y: SVG_CENTER_Y + orbit * Math.sin(bottomAngle),
    },
    {
      x: cx - orbit * Math.cos(bottomAngle),
      y: SVG_CENTER_Y + orbit * Math.sin(bottomAngle),
    },
    {
      x: cx - orbit * Math.cos(Math.PI / 10),
      y: SVG_CENTER_Y - orbit * Math.sin(Math.PI / 10),
    },
  ];
}

export function calcKeywordOrbit(
  sentiSectionWidth: number,
  keywords: string[] = []
): number {
  const count = keywords.length;

  if (count === 0) return MAX_ORBIT;
  const maxPw = Math.max(...keywords.map(pillWidth));
  const halfSec = sentiSectionWidth / 2;
  const margin = 4;

  const angles = getBubbleAngles(count);

  let upperBound = Infinity;
  for (const angle of angles) {
    const absC = Math.abs(Math.cos(angle));
    const absS = Math.abs(Math.sin(angle));
    upperBound = Math.min(upperBound, (halfSec - maxPw / 2 - margin) / absC);
    upperBound = Math.min(
      upperBound,
      (SVG_CENTER_Y - PILL_HEIGHT / 2 - margin) / absS
    );
  }
  if (!isFinite(upperBound)) upperBound = halfSec - maxPw / 2 - margin;

  if (count <= 1) return Math.max(0, Math.min(MAX_ORBIT, upperBound));
  const minAngleGap = count === 5 ? (7 * Math.PI) / 20 : (2 * Math.PI) / count;
  const minByPills = (maxPw + 8) / (2 * Math.sin(minAngleGap / 2));

  return Math.max(0, Math.min(upperBound, Math.max(MAX_ORBIT, minByPills)));
}

export function truncateTitle(title: string): string {
  return title.length > NEWS_MAX_CHARS
    ? title.slice(0, NEWS_MAX_CHARS - 1) + '…'
    : title;
}
