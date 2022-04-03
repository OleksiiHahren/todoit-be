import { Module } from '@nestjs/common';
import { ConfigService } from '@root/modules/config/config.service';

@Module({
  providers: [ConfigService],
})
export class ConfigModule {}
