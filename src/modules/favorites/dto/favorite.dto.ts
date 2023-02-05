import { ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  BeforeUpdateOne,
  CreateOneInputType,
  FilterableField,
  IDField, UpdateOneInputType
} from '@nestjs-query/query-graphql';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { FavoriteTypesEnum } from '@root/data-access/models-enums/favorite-types.enum';

@ObjectType('Favorite')
@BeforeCreateOne((input: CreateOneInputType<FavoriteDto>, context) => {
  input.input.owner = context.req.user;
  return input;
})

export class FavoriteDto {

  @IDField(type => ID)
  id: string;

  @FilterableField({ defaultValue: FavoriteTypesEnum.priority})
  type: FavoriteTypesEnum;

  @FilterableField({ nullable: true })
  priority: string;

  @FilterableField({ nullable: true })
  projectId: string;

  @FilterableField({ nullable: true })
  markId: string;

  @FilterableField({ nullable: true })
  ownerId: string;

  owner?: UserEntity;
}

