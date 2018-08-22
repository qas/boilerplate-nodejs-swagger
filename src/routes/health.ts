import {healthController} from '../controllers/health';

const healthRouter = (router) => router.get('/health', healthController);

export {healthRouter};
