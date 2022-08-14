import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';

@ObjectType('User')
export class UserType {

  @IDField(type => ID)
  id: string;

  @FilterableField()
  firstName: string;

  @FilterableField()
  lastName: string;

  @FilterableField()
  email: string;

  @FilterableField()
  createdAt: string;

}

