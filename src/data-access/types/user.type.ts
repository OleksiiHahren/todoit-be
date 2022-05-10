import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserType {

  @Field(type => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  createdAt: string;
}
