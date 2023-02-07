import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { Body, Logger, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@root/decorators/get-user.decorator';
import { GqlAuthGuard } from '@root/guards/jwt.guard';
import { UserDto } from '@root/modules/common/user/dto/user.dto';
import { ChangePasswordDto } from '@root/modules/common/user/dto/change-password.dto';


@Resolver(() => UserDto)
export class UserService {
  readonly logger = new Logger(UserService.name);

  constructor(
    @InjectQueryService(UserEntity) private readonly service: QueryService<UserEntity>,
  ) {
  }

  @Query(() => UserDto)
  @UseGuards(GqlAuthGuard)
  me(
    @CurrentUser() user
  ): Promise<UserDto> {
    return this.service.findById(user.id);
  }

  @Query(() => UserDto)
  @UseGuards(GqlAuthGuard)
  async changeMyPassword(
    @CurrentUser() user,
    @Args('passwordChange') passwordChange: ChangePasswordDto
  ): Promise<UserDto> {
    try {
      const targetUser = await this.service.getById(user.id);
      const checkPass = await targetUser.validatePassword(
        passwordChange.oldPass
      );
      if (checkPass) {
        await targetUser.hashPassword(passwordChange.newPass);
        console.log(targetUser, 'target user --------')
        const updatedUser = await this.service.updateOne(
          targetUser.id,
          { password: targetUser.password }
        );
        console.log(updatedUser);
        return updatedUser
      } else {
        new Error('incorrect password!');
      }
    } catch (e) {
      this.logger.error(e.message);
    }


  }
}
