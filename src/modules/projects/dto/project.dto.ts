import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  BeforeUpdateOne,
  CreateOneInputType,
  FilterableField,
  Relation, UpdateOneInputType
} from '@nestjs-query/query-graphql';
import { UserDto } from '@root/modules/common/user/dto/user.dto';
import { UserEntity } from '@root/data-access/entities/user.entity';

@ObjectType('Project')
@BeforeCreateOne((input: CreateOneInputType<ProjectDto>, context) => {
  input.input.creator = context.user;
  return input;
})
@BeforeUpdateOne((input: UpdateOneInputType<ProjectDto>, context) => {
  input.update.creator = context.user;
  return input;
})
@Relation('creator', () => UserDto, { disableRemove: false, nullable: false })
export class ProjectDto {
  @FilterableField(type => ID)
  id: string;

  @FilterableField()
  name: string;

  @FilterableField()
  color: string;

  @FilterableField()
  favorite: boolean;

  @FilterableField(() => ID, { nullable: true })
  creatorId: string;

  creator?: UserEntity;

}
