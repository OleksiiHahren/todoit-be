import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputType } from '@root/modules/common/user/types/user-input.type';
import { AuthService } from '@root/modules/common/auth/services/auth.service';
import { TokensType } from '@root/modules/common/auth/types/tokens.type';
import { SignInType } from '@root/modules/common/auth/types/sign-in.type';
import { TokenService } from '@root/modules/common/auth/services/token.service';
import { UserType } from '@root/modules/common/user/types/user.type';

@Resolver(() => UserType)
export class AuthResolver {
  /*  constructor(
      private authService: AuthService,
      private tokenService: TokenService,
    ) {}

    @Query(() => TokensType)
    async signIn(@Args('signInData') signInData: SignInType) {
      return await this.authService.signIn(signInData);
    }

    @Mutation(() => TokensType)
    async signUp(@Args('user') user: UserInputType
    ) {
      return await this.authService.signUp(user);
    }

    @Mutation(() => TokensType)
    async refreshToken(@Args('refreshToken') refreshToken: string
    ) {
      return await this.tokenService.createAccessTokenFromRefreshToken(
        refreshToken,
      );
    }*/
}
