import type { Meta, StoryObj } from '@storybook/react-vite';
import KeywordBubbleMap from './index';
import type { KeywordsWithArticleResponse } from '@/types';

const mockPositiveKeywords: KeywordsWithArticleResponse[] = [
  {
    keyword: '실적호조',
    articles: [
      { articleId: 'a1', title: '삼성전자 실적 호조로 주가 급등' },
      { articleId: 'a2', title: '애플 신제품 출시 기대감 확산' },
      { articleId: 'a3', title: 'AI 반도체 수요 폭발적 증가세' },
    ],
    sentiment: 1,
    date: '2025-05-29',
  },
  {
    keyword: 'AI반도체',
    articles: [{ articleId: 'a3', title: 'AI 반도체 수요 폭발적 증가세' }],
    sentiment: 1,
    date: '2025-05-29',
  },
  {
    keyword: '외국인매수',
    articles: [
      { articleId: 'a4', title: '코스피 외국인 순매수 전환' },
      { articleId: 'a5', title: '2분기 실적 시장 기대치 상회' },
    ],
    sentiment: 1,
    date: '2025-05-29',
  },
  {
    keyword: '신제품기대',
    articles: [
      { articleId: 'a2', title: '애플 신제품 출시 기대감 확산' },
      { articleId: 'a1', title: '삼성전자 실적 호조로 주가 급등' },
      { articleId: 'a5', title: '2분기 실적 시장 기대치 상회' },
      { articleId: 'a3', title: 'AI 반도체 수요 폭발적 증가세' },
      { articleId: 'a4', title: '코스피 외국인 순매수 전환' },
    ],
    sentiment: 1,
    date: '2025-05-29',
  },
  {
    keyword: '어닝서프라이즈',
    articles: [
      { articleId: 'a5', title: '2분기 실적 시장 기대치 상회' },
      { articleId: 'a3', title: 'AI 반도체 수요 폭발적 증가세' },
      { articleId: 'a1', title: '삼성전자 실적 호조로 주가 급등' },
      { articleId: 'a2', title: '애플 신제품 출시 기대감 확산' },
    ],
    sentiment: 1,
    date: '2025-05-29',
  },
];

const mockNegativeKeywords: KeywordsWithArticleResponse[] = [
  {
    keyword: '금리인상',
    articles: [
      { articleId: 'b1', title: '금리 인상 우려에 증시 하락' },
      { articleId: 'b5', title: '인플레이션 예상치 웃돌아' },
      { articleId: 'b3', title: '달러 강세 수출주 압박' },
    ],
    sentiment: -1,
    date: '2025-05-29',
  },
  {
    keyword: '중국침체',
    articles: [
      { articleId: 'b2', title: '중국 경기 침체 공포 확산' },
      { articleId: 'b4', title: '반도체 공급 과잉 우려 지속' },
    ],
    sentiment: -1,
    date: '2025-05-29',
  },
  {
    keyword: '달러강세',
    articles: [
      { articleId: 'b3', title: '달러 강세 수출주 압박' },
      { articleId: 'b1', title: '금리 인상 우려에 증시 하락' },
    ],
    sentiment: -1,
    date: '2025-05-29',
  },
  {
    keyword: '공급과잉',
    articles: [
      { articleId: 'b4', title: '반도체 공급 과잉 우려 지속' },
      { articleId: 'b2', title: '중국 경기 침체 공포 확산' },
      { articleId: 'b5', title: '인플레이션 예상치 웃돌아' },
    ],
    sentiment: -1,
    date: '2025-05-29',
  },
  {
    keyword: '인플레이션',
    articles: [
      { articleId: 'b5', title: '인플레이션 예상치 웃돌아' },
      { articleId: 'b1', title: '금리 인상 우려에 증시 하락' },
    ],
    sentiment: -1,
    date: '2025-05-29',
  },
];

const meta: Meta<typeof KeywordBubbleMap> = {
  title: 'Detail/KeywordBubbleMap',
  component: KeywordBubbleMap,
  args: {
    positiveRatio: 50,
    negativeRatio: 50,
    positiveKeywords: mockPositiveKeywords,
    negativeKeywords: mockNegativeKeywords,
    date: '2025-05-29',
    onNewsClick: (id) => alert(`뉴스 클릭: ${id}`),
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof KeywordBubbleMap>;

export const Default: Story = {};

export const HighPositiveRatio: Story = {
  args: {
    positiveRatio: 80,
    negativeRatio: 20,
    positiveKeywords: mockPositiveKeywords,
    negativeKeywords: mockNegativeKeywords.slice(0, 2),
  },
};

export const LowPositiveRatio: Story = {
  args: {
    positiveRatio: 20,
    negativeRatio: 80,
    positiveKeywords: mockPositiveKeywords.slice(0, 2),
    negativeKeywords: mockNegativeKeywords,
  },
};

export const WithEmptyArticles: Story = {
  args: {
    positiveRatio: 50,
    negativeRatio: 50,
    positiveKeywords: [
      ...mockPositiveKeywords.slice(0, 3),
      { keyword: '배당확대', articles: [], sentiment: 1, date: '2025-05-29' },
      { keyword: '자사주매입', articles: [], sentiment: 1, date: '2025-05-29' },
    ],
    negativeKeywords: [
      ...mockNegativeKeywords.slice(0, 3),
      {
        keyword: '규제리스크',
        articles: [],
        sentiment: -1,
        date: '2025-05-29',
      },
    ],
  },
};
