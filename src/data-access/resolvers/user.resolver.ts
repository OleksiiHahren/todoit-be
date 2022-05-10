import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from '@root/data-access/types/user.type';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '@root/modules/common/auth/services/user.service';
import { UserInputType } from '@root/data-access/types/user-input.type';

@Resolver(() => UserType)
export class UserResolver {

  constructor(private userService: UserService) {
  }

  @Query(() => UserType)
  //@UseGuards(AuthGuard)
  async me(@Args('id', ParseIntPipe) id: number) {
    await this.userService.getById(id);
  }

  // @UseGuards(AuthGuard)
  @Mutation(() => UserType)
  async create(@Args('user') user: UserInputType
  ) {
    return await this.userService.create(user);
  }
}
