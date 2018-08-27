// Controllers
import './controllers/spec';
import './controllers/health';

import cors from 'kcors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';

import {apm} from './apm';
// Factories
import {LogFactory} from './classes/LogFactory';
import {config} from './config';
// Middleware
import {errorHandler} from './middlewares/errorHandler';
import {logHandler} from './middlewares/logHandler';
import {requestId} from './middlewares/requestId';
import {responseHandler} from './middlewares/responseHandler';
// Routes
import {RegisterRoutes} from './routes';

// Instances
const logger = LogFactory.getLogInstance('winston');
const app = new Koa();
const router = new Router({});

// Trust proxy
app.proxy = true;

// Set middlewares
app.use(
    bodyParser({
      enableTypes: ['json', 'form'],
      formLimit: '10mb',
      jsonLimit: '10mb',
    }),
);
app.use(requestId());
app.use(
    cors({
      origin: '*',
      allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
      exposeHeaders: ['X-Request-Id'],
    }),
);
app.use(responseHandler());
app.use(errorHandler());
app.use(logHandler({
  logger,
}));

// Bootstrap application router
app.use(router.routes());
app.use(router.allowedMethods());

RegisterRoutes(router);

function onError(err) {
  if (apm.active) {
    apm.captureError(err);
  }
  logger.error(
      {
        err,
        event: 'error',
      },
      Error('Unhandled exception occured'));
}

// Handle uncaught errors
app.on('error', onError);

// Start server
if (!module.parent) {
  const server = app.listen(config.port, config.host, () => {
    logger.info(
        {
          event: 'execute',
        },
        `API server listening on ${config.host}:${config.port}, in ${
            config.env}`);
  });
  server.on('error', onError);
}

// Expose app
export {app};
