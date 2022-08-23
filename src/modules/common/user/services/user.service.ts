import { InjectQueryService, QueryService } from '@nestjs-query/core';
import {  Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '@root/decorators/get-user.decorator';
import { GqlAuthGuard } from '@root/guards/jwt.guard';
import { UserDto } from '@root/modules/common/user/dto/user.dto';

@Resolver(() => UserDto)
export class UserService {
  constructor(@InjectQueryService(UserEntity) readonly service: QueryService<UserDto>
  ) {
  }

  @Query(() => UserDto)
  @UseGuards(GqlAuthGuard)
  me(
    @CurrentUser() user
  ): Promise<UserDto> {
    return this.service.findById(user.id);
  }
}
