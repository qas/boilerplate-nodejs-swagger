import {showSwaggerSpecController} from '../controllers/spec';

const specRouter = (router) => router.get('/spec', showSwaggerSpecController);

export {specRouter};
