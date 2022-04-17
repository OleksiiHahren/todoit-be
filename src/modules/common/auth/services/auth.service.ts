import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@root/data-access/repositories/user.ropository';
import { GoogleStrategy } from '@root/modules/common/auth/strategy/google.strategy';
import { UserEntity } from '@root/data-access/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
    private googleStrategy: GoogleStrategy,
  ) {}

  async signIn(data) {
    try {
    } catch (e) {}
  }

  async signUp(data) {
    try {
    } catch (e) {}
  }

  async googleAuth(req) {
    if (!req.user) {
      return new HttpException(
        { message: 'User not found' },
        HttpStatus.FORBIDDEN,
      );
    }
    const userExists = await this.userRepo.findByEmail(req.user.email);
    return await this.chooseRequestForProceed(userExists);
    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  private async chooseRequestForProceed(user: UserEntity) {
  }
}
