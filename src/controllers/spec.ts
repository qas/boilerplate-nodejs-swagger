import {Get, Route} from 'tsoa';
const swaggerJson = require('../swagger.json');

@Route('spec')
export class SpecController {
  /** Get the current spec */
  @Get()
  async currentSpec() {
    return swaggerJson;
  }
}
