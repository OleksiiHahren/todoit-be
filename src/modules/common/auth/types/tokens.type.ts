import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from '@root/modules/common/user/types/user.type';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Token')
export class TokensType {

  @FilterableField()
  refreshToken: string;

  @FilterableField()
  accessToken: string;

 /* @FilterableField(() => UserType)
  user: UserType;*/
}
