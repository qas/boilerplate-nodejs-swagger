import {Get, Route} from 'tsoa';

import pkginfo from '../../package.json';
import {Health} from '../models/health';

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
