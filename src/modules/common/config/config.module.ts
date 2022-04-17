import { Module } from '@nestjs/common';
import { ConfigService } from '@root/modules/common/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm.config';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  providers: [ConfigService],
})
export class ConfigModule {}
