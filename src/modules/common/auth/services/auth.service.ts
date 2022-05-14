import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@root/data-access/repositories/user.ropository';
import { GoogleStrategy } from '@root/modules/common/auth/strategy/google.strategy';
import { TokenService } from '@root/modules/common/auth/services/token.service';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { UserInputType } from '@root/modules/common/user/types/user-input.type';
import { TokensType } from '@root/modules/common/auth/types/tokens.type';
import { UserType } from '@root/modules/common/user/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
    private googleStrategy: GoogleStrategy,
    private tokenService: TokenService
  ) {
  }

  async signIn(data) {
    try {
      const userExist = await this.userRepo.findByEmail(data.email);
      console.log(userExist);
      if (!userExist) {
        return new InternalServerErrorException('User not exists!');
      }
      const res = new TokensType();
      res.refreshToken = await this.tokenService.generateRefreshToken(
        userExist
      );
      res.accessToken = await this.tokenService.generateAccessToken(userExist);
      res.user = Object.assign(new UserType(), userExist);
      return res;
    } catch (e) {}
  }

  async signUp(data: UserInputType) {
    try {
    } catch (e) {
    }
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
      userData.firstName = req.firstName;

      const newUser = this.userRepo.create()
    }
  }
}
