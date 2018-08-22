#!/usr/bin/env node

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import {apm} from './apm';
import {config} from './config';

// Middleware
import {errorHandler} from './middlewares/errorHandler';
import {logMiddleware} from './middlewares/log';
import {requestId} from './middlewares/requestId';
import {responseHandler} from './middlewares/responseHandler';

// Routes
import {healthRouter} from './routes/health';
import {specRouter} from './routes/spec';

// Factories
import {LogFactory} from './classes/LogFactory';

// Instances
const logger = LogFactory.getLogInstance('winston');
const app = new Koa();
const router = new Router({prefix: '/v1'});

// Set routes
healthRouter(router);
specRouter(router);

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
app.use(logMiddleware({
  logger,
}));

// Bootstrap application router
app.use(router.routes());
app.use(router.allowedMethods());

function onError(err) {
  if (apm.active) {
    apm.captureError(err);
  }
  logger.error(
      {
        err,
        event: 'error',
      },
      'Unhandled exception occured');
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
