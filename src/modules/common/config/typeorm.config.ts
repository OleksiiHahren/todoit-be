import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@root/modules/common/config/config.service';

const config = new ConfigService();

export default {
  type: config.get<string>('db.type') || 'postgres',
  host: process.env.DB_HOST || config.get('db.host'),
  port: Number(process.env.DB_PORT) || config.get('db.port'),
  username: process.env.DB_USERNAME || config.get('db.username'),
  password: process.env.DB_PASSWORD || config.get('db.password'),
  database: process.env.DB_DATABASE || config.get('db.database'),
  entities: [__dirname + '/../../../**/*.entity.{js,ts}'],
  synchronize: true,
  logging: config.get('db.logging'),
  migrations: [`${__dirname}/../../migrations/*.{ts,js}`],
  migrationsRun: config.get('db.migrationsRun'),
  migrationsTransactionMode: 'each',
  cli: {
    migrationsDir: `src/migrations`,
  },
} as TypeOrmModuleOptions;
