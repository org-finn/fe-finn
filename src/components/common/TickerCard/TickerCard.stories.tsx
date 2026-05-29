import type { Meta, StoryObj } from '@storybook/react-vite';
import TickerCard from './index';
import { AuthContext } from '@/provider/Auth/AuthContext';
import { mockFavoriteTickers } from '@/mocks/myPageHandler';

const mockAuthValue = {
  isAuthenticated: true,
  isLoading: false,
  handleLoginSuccess: async () => {},
  handleLogout: () => {},
};

const meta: Meta<typeof TickerCard> = {
  title: 'Common/TickerCard',
  component: TickerCard,
  decorators: [
    (Story) => (
      <AuthContext.Provider value={mockAuthValue}>
        <Story />
      </AuthContext.Provider>
    ),
  ],
  args: {
    ...mockFavoriteTickers[0],
    onToggleLike: () => {},
    isSelected: false,
  },
};

export default meta;
type Story = StoryObj<typeof TickerCard>;

// 기본 상태 (좋아요 안 됨)
export const Default: Story = {};

// 좋아요 된 상태
export const Selected: Story = {
  args: {
    isSelected: true,
  },
};

// 비로그인 상태
export const LoggedOut: Story = {
  decorators: [
    (Story) => (
      <AuthContext.Provider
        value={{ ...mockAuthValue, isAuthenticated: false }}
      >
        <Story />
      </AuthContext.Provider>
    ),
  ],
};

// 장 마감 상태
export const MarketClosed: Story = {
  args: {
    ...mockFavoriteTickers[1],
    graphData: {
      ...mockFavoriteTickers[1].graphData,
      isMarketOpen: false,
    },
  },
};
