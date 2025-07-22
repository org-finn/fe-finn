import { setupServer } from 'msw/node';
import { mainHandlers } from './mainhandler';

const server = setupServer(...mainHandlers);
export default server;
