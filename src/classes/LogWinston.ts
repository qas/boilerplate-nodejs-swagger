import * as winston from 'winston';
import {Loggly} from 'winston-loggly-bulk';

import {Log} from '../classes/Log';
import {config} from '../config';

const env = config.env;

winston.remove(winston.transports.Console);

function addWinstonTransport(transport) {
  winston.add(transport);
}

switch (env) {
  case 'test':
  case 'development':
    addWinstonTransport(new winston.transports.Console());
    break;
  default:
    addWinstonTransport(new Loggly({
      token: config.get('loggly.token'),
      subdomain: config.get('loggly.subdomain'),
      tags: ['winston@3.0.0'],
      json: true,
      handleExceptions: true,
      colorize: false,
    }));
}

class LogWinston extends Log {
  log(level, message, meta) {
    winston.log(level, message, meta);
  }
}

export {LogWinston};
