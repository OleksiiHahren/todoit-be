import { Module } from '@nestjs/common';
import { UserResolver } from '@root/modules/common/user/resolvers/user.resolver';
import { UserService } from '@root/modules/common/user/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@root/data-access/repositories/user.ropository';
import { RefreshTokensRepository } from '@root/data-access/repositories/refresh-token.repository';
import { AuthModule } from '@root/modules/common/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([UserRepository, RefreshTokensRepository])],
  providers: [UserResolver, UserService]
})
export class UserModule {}
