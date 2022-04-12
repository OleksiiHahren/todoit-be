import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '@root/modules/common/auth/interfaces/jwt.interface';
import { ConfigService } from '@root/modules/common/config/config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@root/data-access/repositories/user.ropository';
import { UnauthorizedException } from '@nestjs/common';

const config = new ConfigService();
const jwtSecret = config.get('jwt.secret');

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(data: JwtPayload) {
    try {
      const user = await this.userRepo.findOneOrFail({ id: data.userId });
      return user;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
