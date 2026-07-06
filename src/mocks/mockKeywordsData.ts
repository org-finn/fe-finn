import type { KeywordsWithArticleResponse } from '@/types';

export const mockKeywordsData: KeywordsWithArticleResponse[] = [
  {
    keyword: '실적호조',
    articles: [
      { articleId: '1', title: '삼성전자 실적 호조로 주가 급등' },
      { articleId: '2', title: '애플 신제품 출시 기대감 확산' },
      { articleId: '3', title: 'AI 반도체 수요 폭발적 증가세' },
    ],
    sentiment: 1,
    date: '2025-05-29',
  },
  {
    keyword: 'AI반도체',
    articles: [{ articleId: '3', title: 'AI 반도체 수요 폭발적 증가세' }],
    sentiment: 1,
    date: '2025-05-29',
  },
  {
    keyword: '신제품기대 완전 기대',
    articles: [
      { articleId: '2', title: '애플 신제품 출시 기대감 확산' },
      { articleId: '1', title: '삼성전자 실적 호조로 주가 급등' },
      { articleId: '5', title: '2분기 실적 시장 기대치 상회' },
      { articleId: '3', title: 'AI 반도체 수요 폭발적 증가세' },
      { articleId: '4', title: '코스피 외국인 순매수 전환' },
    ],
    sentiment: 1,
    date: '2025-05-29',
  },
  {
    keyword: '어닝서프라이즈',
    articles: [
      { articleId: '5', title: '2분기 실적 시장 기대치 상회' },
      { articleId: '3', title: 'AI 반도체 수요 폭발적 증가세' },
      { articleId: '1', title: '삼성전자 실적 호조로 주가 급등' },
      { articleId: '2', title: '애플 신제품 출시 기대감 확산' },
    ],
    sentiment: 1,
    date: '2025-05-29',
  },
  {
    keyword: '데이터센터 전력 확보',
    articles: [],
    sentiment: 1,
    date: '2025-05-29',
  },
  {
    keyword: '인공지능 인프라센터 건축',
    articles: [
      { articleId: '1', title: '금리 인상 우려에 증시 하락' },
      { articleId: '5', title: '인플레이션 예상치 웃돌아' },
      { articleId: '3', title: '달러 강세 수출주 압박' },
    ],
    sentiment: -1,
    date: '2025-05-29',
  },
  {
    keyword: '달러강세',
    articles: [
      { articleId: '3', title: '달러 강세 수출주 압박' },
      { articleId: '1', title: '금리 인상 우려에 증시 하락' },
    ],
    sentiment: -1,
    date: '2025-05-29',
  },
  {
    keyword: '공급 과잉 우려',
    articles: [
      { articleId: '6', title: '반도체 공급 과잉 우려 지속' },
      { articleId: '4', title: '중국 경기 침체 공포 확산' },
      { articleId: '5', title: '인플레이션 예상치 웃돌아' },
    ],
    sentiment: -1,
    date: '2025-05-29',
  },
  {
    keyword: '인플레이션',
    articles: [
      { articleId: '5', title: '인플레이션 예상치 웃돌아' },
      { articleId: '1', title: '금리 인상 우려에 증시 하락' },
    ],
    sentiment: -1,
    date: '2025-05-29',
  },
  {
    keyword: '규제리스크 우려',
    articles: [],
    sentiment: -1,
    date: '2025-05-29',
  },
];
