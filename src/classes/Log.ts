import * as util from 'util';

import pkginfo from '../../package.json';
import {config} from '../config';

const version = pkginfo.version;
const defaults = {
  msg: '',
  env: config.env,
  service: config.name,
  version,
  meta: {},
};

const generate = (payload = {}) => Object.assign(defaults, payload);

class Log {
  error(meta = {}, err) {
    this.log('error', generate({
               msg: util.inspect(err),
               err,
               meta,
             }));
  }

  warn(meta = {}, msg) {
    this.log('warn', generate({
               msg,
               meta,
             }));
  }

  info(meta = {}, msg) {
    this.log('info', generate({
               msg,
               meta,
             }));
  }

  log(level, message, meta = null) {
    switch (level) {
      case 'info':
        // tslint:disable-next-line:no-console
        console.info(message);
        break;
      case 'warn':
        // tslint:disable-next-line:no-console
        console.warn(message);
        break;
      case 'error':
        // tslint:disable-next-line:no-console
        console.error(message);
        break;
      default:
        throw new Error(`${level} is not an acceptable log level.`);
    }
  }
}

export {Log};
