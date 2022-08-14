import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleStrategy } from '@root/modules/common/auth/strategy/google.strategy';
import { TokenService } from '@root/modules/common/auth/services/token.service';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { TokensType } from '@root/modules/common/auth/types/tokens.type';
import { UserType } from '@root/modules/common/user/types/user.type';
import { ConfigService } from '@root/modules/common/config/config.service';
import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { SignInType } from '@root/modules/common/auth/types/sign-in.type';

const config = new ConfigService();

@Injectable()
export class AuthService {
  constructor(
    @InjectQueryService(UserEntity) readonly userRepo: QueryService<UserEntity>,
    private googleStrategy: GoogleStrategy,
    private tokenService: TokenService
  ) {
  }

  async signIn(data: UserType | SignInType) {
    try {
      const [userExist] = await this.userRepo.query({
        filter: { email: { eq: data.email } }
      });

      if (!userExist) {
        return new InternalServerErrorException('User not exists!');
      }
      const res = await this.fillResponse(userExist);
      return res;
    } catch (e) {
    }
  }

  async signUp(data) {
    try {
      const [userExist] = await this.userRepo.query({
        filter: {
          email: data.email
        }
      });
      if (userExist) {
        return new InternalServerErrorException('User already exists!');
      }
      const user = await this.userRepo.createOne(data);
      return await this.fillResponse(user);
    } catch (e) {
    }
  }

  async googleAuth(req, res) {
    const FERedirectLink = process.env.FE_REDIRECT_URL;
    if (!req.user) {
      return new HttpException(
        { message: 'User not found' },
        HttpStatus.FORBIDDEN
      );
    }
    const user = await this.proceedUserLogicWithGoogleAuth(req);

    res.body = user;
    res.redirect(`${FERedirectLink}?accessToken=
      ${user.accessToken}&refreshToken=${user.refreshToken}`);
  }

  private async proceedUserLogicWithGoogleAuth(req): Promise<TokensType> {
    let [userExist] = await this.userRepo.query({
      filter: { email: req.email }
    });
    if (!userExist) {
      const userData = new UserEntity();
      userData.firstName = req.firstName;
      userExist = await this.userRepo.createOne(userData);
    }
    return this.fillResponse(userExist);
  }

  private async fillResponse(user: UserEntity): Promise<TokensType> {
    const data = new TokensType();
    data.refreshToken = await this.tokenService.generateRefreshToken(
      user
    );
    data.accessToken = await this.tokenService.generateAccessToken(user);
    //data.user = Object.assign(new UserType(), user);
    console.log(data, 'token data');
    return data;
  }
}
