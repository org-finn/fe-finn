import { setupServer } from 'msw/node';
import { mainHandlers } from './mainHandler';
import { detailHandlers } from './detailHandlers';
import newsHandlers from './newsHandler';
import { searchHandlers } from './searchHandler';
import { articleDetailHandlers } from './articleDetailHandler';

const server = setupServer(
  ...mainHandlers,
  ...detailHandlers,
  ...newsHandlers,
  ...searchHandlers,
  ...articleDetailHandlers
);
export default server;
