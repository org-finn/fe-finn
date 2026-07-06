import type { Preview } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from '../src/global';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
        },
      });

      return (
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            <Story />
          </QueryClientProvider>
        </BrowserRouter>
      );
    },
  ],
};

export default preview;
