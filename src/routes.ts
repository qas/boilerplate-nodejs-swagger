/* tslint:disable */
import {Controller, FieldErrors, TsoaRoute, ValidateError, ValidateParam} from 'tsoa';

import {HealthController} from './controllers/health';
import {SpecController} from './controllers/spec';

const models: TsoaRoute.Models = {
  'Health': {
    'properties': {
      'name': {'dataType': 'string', 'required': true},
      'version': {'dataType': 'double', 'required': true},
      'description': {'dataType': 'string', 'required': true},
      'author': {'dataType': 'string', 'required': true},
    },
  },
};

export function RegisterRoutes(router: any) {
  router.get('/v1/health', async (context, next) => {
    const args = {};

    let validatedArgs: any[] = [];
    try {
      validatedArgs = getValidatedArgs(args, context);
    } catch (error) {
      context.status = error.status || 500;
      context.body = error;
      return next();
    }

    const controller = new HealthController();

    const promise = controller.current.apply(controller, validatedArgs);
    return promiseHandler(controller, promise, context, next);
  });
  router.get('/v1/spec', async (context, next) => {
    const args = {};

    let validatedArgs: any[] = [];
    try {
      validatedArgs = getValidatedArgs(args, context);
    } catch (error) {
      context.status = error.status || 500;
      context.body = error;
      return next();
    }

    const controller = new SpecController();

    const promise = controller.current.apply(controller, validatedArgs);
    return promiseHandler(controller, promise, context, next);
  });


  function isController(object: any): object is Controller {
    return 'getHeaders' in object && 'getStatus' in object &&
        'setStatus' in object;
  }

  function promiseHandler(
      controllerObj: any, promise: Promise<any>, context: any,
      next: () => Promise<any>) {
    return Promise.resolve(promise)
        .then((data: any) => {
          if (data || data === false) {
            context.body = data;
            context.status = 200;
          } else {
            context.status = 204;
          }

          if (isController(controllerObj)) {
            const headers = controllerObj.getHeaders();
            Object.keys(headers).forEach((name: string) => {
              context.set(name, headers[name]);
            });

            const statusCode = controllerObj.getStatus();
            if (statusCode) {
              context.status = statusCode;
            }
          }
          next();
        })
        .catch((error: any) => {
          context.status = error.status || 500;
          context.body = error;
          next();
        });
  }

  function getValidatedArgs(args: any, context: any): any[] {
    const errorFields: FieldErrors = {};
    const values = Object.keys(args).map(key => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return context.request;
        case 'query':
          return ValidateParam(
              args[key], context.request.query[name], models, name, errorFields)
          case 'path': return ValidateParam(
              args[key], context.params[name], models, name, errorFields)
          case 'header': return ValidateParam(
              args[key], context.request.headers[name], models, name,
              errorFields);
        case 'body':
          return ValidateParam(
              args[key], context.request.body, models, name, errorFields,
              name + '.');
        case 'body-prop':
          return ValidateParam(
              args[key], context.request.body[name], models, name, errorFields,
              'body.');
      }
    });
    if (Object.keys(errorFields).length > 0) {
      throw new ValidateError(errorFields, '');
    }
    return values;
  }
}
