import {Get, Route} from 'tsoa';
import swaggerJson from '../swagger.json';

@Route('spec')
export class SpecController {
  /** Get the current spec */
  @Get()
  async currentSpec() {
    return swaggerJson;
  }
}
