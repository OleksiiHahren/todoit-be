import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from '@root/modules/common/user/types/user.type';

@ObjectType('TokensType')
export class TokensType {
  @Field({ nullable: true })
  refreshToken: string;

  @Field()
  accessToken: string;

  @Field(() => UserType)
  user: UserType;
}
