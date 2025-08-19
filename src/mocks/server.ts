import { setupServer } from 'msw/node';
import { mainHandlers } from './mainHandler';
import { detailHandlers } from './detailHandlers';
import newsHandlers from './newsHandler';
import { searchHandlers } from './searchHandler';

const server = setupServer(
  ...mainHandlers,
  ...detailHandlers,
  ...newsHandlers,
  ...searchHandlers
);
export default server;
