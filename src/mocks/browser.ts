import { setupWorker } from 'msw/browser';
import { mainHandlers } from './mainHandler';
import { detailHandlers } from './detailHandlers';
import newsHandlers from './newsHandler';

export const worker = setupWorker(
  ...mainHandlers,
  ...detailHandlers,
  ...newsHandlers
);

export default worker;
