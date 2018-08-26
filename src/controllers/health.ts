import {Get, Route} from 'tsoa';
import {Health} from '../models/health';
const pkginfo = require('../../package.json');

@Route('health')
export class HealthController {
  /** Get the current health */
  @Get()
  async currentHealth(): Promise<Health> {
    return {
      name: pkginfo.name,
      version: pkginfo.version,
      description: pkginfo.description,
      author: pkginfo.author,
    };
  }
}
