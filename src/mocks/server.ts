import { setupServer } from 'msw/node';
import { mainHandlers } from './mainHandler';
import { detailHandlers } from './detailHandlers';
import newsHandlers from './newsHandler';

const server = setupServer(...mainHandlers, ...detailHandlers, ...newsHandlers);
export default server;
