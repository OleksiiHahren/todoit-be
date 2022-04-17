import { Module } from '@nestjs/common';
import { AuthModule } from '@root/modules/common/auth/auth.module';
import { ConfigModule } from '@root/modules/common/config/config.module';

@Module({
  imports: [AuthModule, ConfigModule],
  exports: [AuthModule, ConfigModule],
})
export class CommonModule {}
