import { Injectable } from '@nestjs/common';
import ProcessEnv = NodeJS.ProcessEnv;
import * as config from 'config';
import * as get from 'lodash.get';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly environments: object;

  constructor() {
    dotenv.config();
    this.environments = this.getEnv(process.env);
  }

  exist(settingKey: string): boolean {
    return config.has(settingKey);
  }

  private getEnv(process: ProcessEnv): object {
    return;
  }

  get<T>(setting): T {
    const envVariable = get(this.environments, setting);
    return envVariable ? envVariable : config.get<T>(setting);
  }
}
