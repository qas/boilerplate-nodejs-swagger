import {Get, Route} from 'tsoa';
const swaggerJson = require('../swagger.json');

@Route('spec')
export class SpecController {
  @Get()
  async current() {
    return swaggerJson;
  }
}
