import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleStrategy } from '@root/modules/common/auth/strategy/google.strategy';
import { TokenService } from '@root/modules/common/auth/services/token.service';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { TokensType } from '@root/modules/common/auth/types/tokens.type';
import { ConfigService } from '@root/modules/common/config/config.service';
import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { SignInType } from '@root/modules/common/auth/types/sign-in.type';
import { UserDto } from '@root/modules/common/user/dto/user.dto';

const config = new ConfigService();

@Injectable()
export class AuthService {
  constructor(
    @InjectQueryService(UserEntity) readonly userRepo: QueryService<UserEntity>,
    private googleStrategy: GoogleStrategy,
    private tokenService: TokenService
  ) {
  }

  async signIn(data: UserDto | SignInType) {
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
      const userExists = await this.userRepo.query({
        filter: {
          email: { eq: data.email }
        }
      });
      if (userExists.length) {
        return new InternalServerErrorException('User already exists!');
      }
      const userEntity = new UserEntity(data.password); // TODO send email after registration
      userEntity.firstName = data.firstName;
      userEntity.lastName = data.lastName;
      userEntity.email = data.email;
      const user = await this.userRepo.createOne(userEntity);
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
    res.redirect(`${FERedirectLink}?accessToken=${user.accessToken}&refreshToken=${user.refreshToken}`);
  }

  private async proceedUserLogicWithGoogleAuth(req): Promise<TokensType> {
    console.log(req, '----------req');
    let [userExist] = await this.userRepo.query({
      filter: { email: { eq: req.user.email } }
    });
    console.log(userExist, 'userExist ---------');
    if (!userExist) {
      const temporaryPassword = (Math.random() + 1).toString(36).substring(7);
      const userData = new UserEntity(temporaryPassword); // TODO send email after registration
      userData.firstName = req.user.firstName;
      userData.firstName = req.user.firstName;
      userData.lastName = req.user.lastName;
      userData.email = req.user.email;
      userExist = await this.userRepo.createOne(userData);
    }
    return this.fillResponse(userExist);
  }

  private async fillResponse(user: UserEntity): Promise<TokensType> {
    try {
      const data = new TokensType();
      data.refreshToken = await this.tokenService.generateRefreshToken(
        user
      );
      data.accessToken = await this.tokenService.generateAccessToken(user);
      console.log('data.accessToken------>', data.accessToken);
      return data;
    } catch (e) {
      console.error(e.message)
    }

  }
}
