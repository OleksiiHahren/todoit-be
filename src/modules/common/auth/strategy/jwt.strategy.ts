import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@root/modules/common/config/config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@root/data-access/repositories/user.ropository';
import { Injectable } from '@nestjs/common';
import { RefreshTokenPayload } from '@root/modules/common/auth/services/token.service';
import { UserEntity } from '@root/data-access/entities/user.entity';

const config = new ConfigService();
const jwtSecret = config.get('jwt.secret');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
/*  constructor(@InjectRepository(UserRepository) private users: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || jwtSecret,
    });
    this.users = users;
  }

  async validate(payload: RefreshTokenPayload): Promise<UserEntity> {
    const { subject: id } = payload;
    return await this.users.findOneOrFail(id);
  }*/
}
