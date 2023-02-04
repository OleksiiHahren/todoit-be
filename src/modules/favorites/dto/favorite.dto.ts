import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  BeforeUpdateOne,
  CreateOneInputType,
  FilterableField,
  IDField, UpdateOneInputType
} from '@nestjs-query/query-graphql';

@ObjectType('Favorite')
@BeforeCreateOne((input: CreateOneInputType<FavoriteDto>, context) => {
  input.input.owner = context.req.user;
  return input;
})
@BeforeUpdateOne((input: UpdateOneInputType<FavoriteDto>, context) => {
  input.update.owner = context.user;
  return input;
})
export class FavoriteDto {

  @IDField(type => ID)
  id: string;

  @FilterableField({ nullable: true })
  priority: string;

  @FilterableField({ nullable: true })
  projectId: string;

  @FilterableField({ nullable: true })
  markId: string;

  @FilterableField({ nullable: true })
  ownerId: string;
}

