import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from '@root/modules/common/user/types/user.type';
import { UseGuards } from '@nestjs/common';
import { UserService } from '@root/modules/common/user/services/user.service';
import { UserInputType } from '@root/modules/common/user/types/user-input.type';
import { GqlAuthGuard } from '@root/guards/jwt.guard';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {
  }

  @Query(() => UserType)
  @UseGuards(GqlAuthGuard)
  me(@Context() context) {
    return context.req.user;
  }

  @Mutation(() => UserType)
  async create(@Args('user') user: UserInputType) {
    return await this.userService.create(user);
  }

  @Mutation(() => UserType)
  async update(@Args('user') user: UserInputType) {
    return await this.userService.update(user);
  }
}
