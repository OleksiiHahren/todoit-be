import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { GoogleStrategy } from '@root/modules/common/auth/strategy/google.strategy';
import { TokenService } from '@root/modules/common/auth/services/token.service';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { TokensType } from '@root/modules/common/auth/types/tokens.type';
import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { SignInType } from '@root/modules/common/auth/types/sign-in.type';
import { SenderService } from '@root/modules/email-sending/services/sender.service';

@Injectable()
export class AuthService {
  readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectQueryService(UserEntity) readonly userRepo: QueryService<UserEntity>,
    private senderService: SenderService,
    private googleStrategy: GoogleStrategy,
    private tokenService: TokenService
  ) {
  }

  async signIn(data: SignInType) {
    try {
      const [userExist] = await this.userRepo.query({
        filter: { email: { eq: data.email } }
      });
      const validPass = await userExist.validatePassword(data.password);
      if (userExist && validPass) {
        const res = await this.fillResponse(userExist);
        return res;
      }
      return new InternalServerErrorException({ message: 'User not exists or credential was incorrect!' });

    } catch (e) {
      this.logger.error(e.message)
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
      await this.senderService.newUserGreating(user);
      return await this.fillResponse(user);
    } catch (e) {
      this.logger.error(`new user sign up is failed with error:`, e.message)
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
    try {
      let [userExist] = await this.userRepo.query({
        filter: { email: { eq: req.user.email } }
      });
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
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  private async fillResponse(user: UserEntity): Promise<TokensType> {
    try {
      const data = new TokensType();
      data.refreshToken = await this.tokenService.generateRefreshToken(
        user
      );
      data.accessToken = await this.tokenService.generateAccessToken(user);
      return data;
    } catch (e) {
      this.logger.error(e.message);
    }

  }
}
