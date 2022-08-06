import { Filter, InjectAssemblerQueryService, InjectQueryService, QueryService } from '@nestjs-query/core';
import { ConnectionType } from '@nestjs-query/query-graphql';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { UserConnection, UserQuery } from '@root/modules/common/user/types/user-connection.dto';
import { UserType } from '@root/modules/common/user/types/user.type';

@Resolver(() => UserType)
export class UserService {
  constructor(@InjectQueryService(UserEntity) readonly service: QueryService<UserType>
  ) {
  }


  @Query(() => UserConnection)
  completedTodoItems(
    @Args() query: UserQuery
  ): Promise<ConnectionType<UserType>> {
    // add the completed filter the user provided filter
    const filter: Filter<UserType> = {
      ...query.filter,
      ...{ firstName: { eq: 'olek' } }
    };

    return UserConnection.createFromPromise((q) =>
      this.service.query(q), {
      ...query,
      ...{ filter }
    });
  }
}
