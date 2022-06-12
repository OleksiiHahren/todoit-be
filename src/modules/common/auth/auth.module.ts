import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@root/data-access/repositories/user.ropository';
import { GoogleStrategy } from '@root/modules/common/auth/strategy/google.strategy';
import { AuthController } from '@root/modules/common/auth/controllers/auth.controller';
import { AuthService } from '@root/modules/common/auth/services/auth.service';
import { RefreshTokensRepository } from '@root/data-access/repositories/refresh-token.repository';
import { TokenService } from '@root/modules/common/auth/services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from '@root/modules/common/auth/resolvers/auth.resolver';
import * as config from 'config';
import { PassportModule } from '@nestjs/passport';

const jwtConfig = config.get('jwt');


@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret
    }),
    PassportModule.register({ defaultStrategy: 'google' }),
    TypeOrmModule.forFeature([UserRepository, RefreshTokensRepository])
  ],
  providers: [GoogleStrategy, AuthService, AuthResolver, TokenService],
  exports: [TokenService],
})
export class AuthModule {}
