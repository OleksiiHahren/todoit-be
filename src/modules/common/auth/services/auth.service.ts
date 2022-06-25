import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@root/data-access/repositories/user.ropository';
import { GoogleStrategy } from '@root/modules/common/auth/strategy/google.strategy';
import { TokenService } from '@root/modules/common/auth/services/token.service';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { UserInputType } from '@root/modules/common/user/types/user-input.type';
import { TokensType } from '@root/modules/common/auth/types/tokens.type';
import { UserType } from '@root/modules/common/user/types/user.type';
import { ConfigService } from '@root/modules/common/config/config.service';

const config = new ConfigService();

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
      if (!userExist) {
        return new InternalServerErrorException('User not exists!');
      }
      const res = await this.fillResponse(userExist);
      return res;
    } catch (e) {}
  }

  async signUp(data: UserInputType) {
    try {
      const userExist = await this.userRepo.findByEmail(data.email);
      if (userExist) {
        return new InternalServerErrorException('User already exists!');
      }
      const user = await this.userRepo.createUser(data);
      return await this.fillResponse(user);
    } catch (e) {
    }
  }

  async googleAuth(req, res) {
    const FERedirectLink = process.env.FE_REDIRECT_URL;
    if (!req.user) {
      return new HttpException(
        { message: 'User not found' },
        HttpStatus.FORBIDDEN,
      );
    }
    const user = await this.proceedUserLogicWithGoogleAuth(req);

    res.body = user;
    res.redirect(`${FERedirectLink}?accessToken=
    ${user.accessToken}&refreshToken=${user.refreshToken}`);
  }

  private async proceedUserLogicWithGoogleAuth(req): Promise<TokensType> {
    let user = await this.userRepo.findByEmail(req.user.email);
    if (!user) {
      const userData = new UserEntity();
      userData.firstName = req.firstName;
      user = this.userRepo.create();
    }
    return this.fillResponse(user);
  }

  private async fillResponse(user: UserEntity): Promise<TokensType> {
    const data = new TokensType();
    data.refreshToken = await this.tokenService.generateRefreshToken(
      user
    );
    data.accessToken = await this.tokenService.generateAccessToken(user);
    data.user = Object.assign(new UserType(), user);
    return data;
  }
}
