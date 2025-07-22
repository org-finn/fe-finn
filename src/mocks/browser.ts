import { setupWorker } from 'msw/browser';
import { mainHandlers } from './mainhandler';

export const worker = setupWorker(...mainHandlers);

export default worker;
