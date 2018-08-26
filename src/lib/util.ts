import {get, isNil, isObject, set} from 'lodash';

const timeout = async (milliseconds) => {
  return new Promise(((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  }));
};

export {get, isNil, isObject, set, timeout};
