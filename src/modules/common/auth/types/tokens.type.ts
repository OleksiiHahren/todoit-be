import { ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Token')
export class TokensType {

  @FilterableField({ nullable: true })
  refreshToken: string;

  @FilterableField({ nullable: true })
  accessToken: string;

  /* @FilterableField(() => UserType)
   user: UserType;*/
}
