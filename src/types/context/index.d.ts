import {Context as KoaContext} from 'koa';

declare interface Context extends KoaContext {
  responseTime: number;
}
