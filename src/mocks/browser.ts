import { setupWorker } from 'msw/browser';
import { mainHandlers } from './mainHandler';
import { detailHandlers } from './detailHandlers';
import newsHandlers from './newsHandler';
import { searchHandlers } from './searchHandler';
import { articleDetailHandlers } from './articleDetailHandler';
import { joinHandlers } from './joinHandler';
import { myPageHandlers } from './myPageHandler';

export const worker = setupWorker(
  ...mainHandlers,
  ...detailHandlers,
  ...newsHandlers,
  ...searchHandlers,
  ...articleDetailHandlers,
  ...joinHandlers,
  ...myPageHandlers
);

export default worker;
