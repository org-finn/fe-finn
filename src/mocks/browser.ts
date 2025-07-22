import { setupWorker } from 'msw/browser';
import { mainHandlers } from './mainHandler';
import { detailHandlers } from './detailHandlers';

export const worker = setupWorker(...mainHandlers, ...detailHandlers);

export default worker;
