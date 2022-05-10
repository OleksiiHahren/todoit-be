import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@root/data-access/repositories/user.ropository';
import { GoogleStrategy } from '@root/modules/common/auth/strategy/google.strategy';
import { JwtStrategy } from '@root/modules/common/auth/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@root/modules/common/auth/controllers/auth.controller';
import { AuthService } from '@root/modules/common/auth/services/auth.service';
import { RefreshTokensRepository } from '@root/data-access/repositories/refresh-token.repository';
import { TokenService } from '@root/modules/common/auth/services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { UserResolver } from '@root/data-access/resolvers/user.resolver';
import { UserService } from '@root/modules/common/auth/services/user.service';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserRepository, RefreshTokensRepository])
  ],
  providers: [
    GoogleStrategy,
    JwtStrategy,
    AuthService,
    TokenService,
    UserResolver,
    UserService,
  ],
})
export class AuthModule {}
