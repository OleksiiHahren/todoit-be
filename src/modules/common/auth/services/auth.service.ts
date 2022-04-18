import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@root/data-access/repositories/user.ropository';
import { GoogleStrategy } from '@root/modules/common/auth/strategy/google.strategy';
import { TokenService } from '@root/modules/common/auth/services/token.service';
import { UserEntity } from '@root/data-access/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
    private googleStrategy: GoogleStrategy,
    private tokenService: TokenService
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
    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  private async proceedUserLogicWithGoogleAuth(req) {
    const userExists = await this.userRepo.findByEmail(req.user.email);
    if (userExists) {
      const accessToken = await this.tokenService.generateAccessToken(
        userExists,
      );
      const refreshToken = await this.tokenService.generateRefreshToken(
        userExists,
      );
    } else {
      const userData = new UserEntity();
      userData.firsName = req.firsName;

      const newUser = this.userRepo.create()
    }
  }
}
