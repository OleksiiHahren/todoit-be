import { Module } from '@nestjs/common';
import { AuthModule } from '@root/modules/common/auth/auth.module';
import { ConfigModule } from '@root/modules/common/config/config.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, ConfigModule, UserModule],
  exports: [AuthModule, ConfigModule, UserModule],
})
export class CommonModule {}
