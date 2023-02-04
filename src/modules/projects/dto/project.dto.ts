import { ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  BeforeUpdateOne,
  CreateOneInputType,
  FilterableField,
  Relation,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql';
import { UserDto } from '@root/modules/common/user/dto/user.dto';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { ContextType } from '@nestjs/common';
import { FavoriteEntity } from '@root/data-access/entities/favorites.entity';
import { FavoriteDto } from '@root/modules/favorites/dto/favorite.dto';

@ObjectType('Project')
@BeforeCreateOne((input: CreateOneInputType<ProjectDto>, context) => {
  input.input.creator = context.req.user;
  return input;
})
@BeforeUpdateOne((input: UpdateOneInputType<ProjectDto>, context) => {
  input.update.creator = context.req.user;
  return input;
})

@Relation('favorite', () => FavoriteDto, { disableRemove: false, nullable: true })
@Relation('creator', () => UserDto, { disableRemove: false, nullable: false })

export class ProjectDto {
  @FilterableField(() => ID)
  id: string;

  @FilterableField()
  name: string;

  @FilterableField()
  color: string;



  @FilterableField(() => ID, { nullable: true })
  creatorId: string;

  @FilterableField(() => ID, { nullable: true })
  favoriteId: string;

  creator?: UserEntity;

  favorite?: FavoriteEntity;

}
