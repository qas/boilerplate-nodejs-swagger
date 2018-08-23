import {Log} from '../classes/Log';
import {LogWinston} from '../classes/LogWinston';

class LogFactory {
  static getLogInstance(logProvider) {
    switch (logProvider) {
      case 'console':
        return new Log();
      case 'winston':
        return new LogWinston();
      default:
        throw Error(`Logger ${logProvider} is not recognized`);
    }
  }
}

export {LogFactory};
