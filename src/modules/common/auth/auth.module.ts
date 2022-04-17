import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@root/data-access/repositories/user.ropository';
import { GoogleStrategy } from '@root/modules/common/auth/strategy/google.strategy';
import { JwtStrategy } from '@root/modules/common/auth/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@root/modules/common/auth/controllers/auth.controller';
import { AuthService } from '@root/modules/common/auth/services/auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [GoogleStrategy, JwtStrategy, AuthService],
})
export class AuthModule {}
