import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputType } from '@root/modules/common/user/types/user-input.type';
import { AuthService } from '@root/modules/common/auth/services/auth.service';
import { TokensType } from '@root/modules/common/auth/types/tokens.type';
import { SignInType } from '@root/modules/common/auth/types/sign-in.type';

@Resolver('UserTokens')
export class AuthResolver {
  constructor(private authService: AuthService) {
  }

  @Query(() => TokensType)
  async signIn(@Args('signInData') signInData: SignInType) {
    return await this.authService.signIn(signInData);
  }

  @Mutation(() => TokensType)
  async signUp(@Args('user') user: UserInputType
  ) {
    return await this.authService.signUp(user);
  }
}
