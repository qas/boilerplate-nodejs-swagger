import {get, isNil, isObject, set} from 'lodash';

const timeout = async (milliseconds) => {
  return new Promise(((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  }));
};

export {isObject, isNil, get, set, timeout};
