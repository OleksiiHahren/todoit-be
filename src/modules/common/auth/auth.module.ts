import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@root/data-access/repositories/user.ropository';
import { GoogleStrategy } from '@root/modules/common/auth/strategy/google.strategy';
import { JwtStrategy } from '@root/modules/common/auth/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [GoogleStrategy, JwtStrategy],
})
export class AuthModule {}
