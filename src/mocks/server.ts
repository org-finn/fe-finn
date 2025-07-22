import { setupServer } from 'msw/node';
import { mainHandlers } from './mainHandler';
import { detailHandlers } from './detailHandlers';

const server = setupServer(...mainHandlers, ...detailHandlers);
export default server;
