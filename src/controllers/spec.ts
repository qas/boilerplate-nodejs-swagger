import {spec} from '../spec';

const showSwaggerSpecController = (ctx) => {
  ctx.body = spec;
};

export {showSwaggerSpecController};
