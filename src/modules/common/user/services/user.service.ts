import { Filter, InjectAssemblerQueryService, InjectQueryService, QueryService } from '@nestjs-query/core';
import { ConnectionType } from '@nestjs-query/query-graphql';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { UserConnection, UserQuery } from '@root/modules/common/user/types/user-connection.dto';
import { UserType } from '@root/modules/common/user/types/user.type';
import { Req, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@root/decorators/get-user.decorator';
import { GqlAuthGuard } from '@root/guards/jwt.guard';

@Resolver(() => UserType)
export class UserService {
  constructor(@InjectQueryService(UserEntity) readonly service: QueryService<UserType>
  ) {
  }

  @Query(() => UserType)
  @UseGuards(GqlAuthGuard)
  me(
    @CurrentUser() user
  ): Promise<UserType> {
    return this.service.findById(user.id);
  }
}
