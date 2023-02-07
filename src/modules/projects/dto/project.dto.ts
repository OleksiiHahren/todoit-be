import { ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  BeforeUpdateOne,
  CreateOneInputType,
  FilterableField,
  Relation, UnPagedRelation,
  UpdateOneInputType
} from '@nestjs-query/query-graphql';
import { UserDto } from '@root/modules/common/user/dto/user.dto';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';

@ObjectType('Project')
@BeforeCreateOne((input: CreateOneInputType<ProjectDto>, context) => {
  input.input.creator = context.req.user;
  return input;
})
@BeforeUpdateOne((input: UpdateOneInputType<ProjectDto>, context) => {
  input.update.creator = context.req.user;
  return input;
})
@Relation('creator', () => UserDto, { disableRemove: false, nullable: false })
@UnPagedRelation('tasks', () => TaskDto, { disableRemove: false, nullable: true })
export class ProjectDto {
  @FilterableField(() => ID)
  id: string;

  @FilterableField()
  name: string;

  @FilterableField()
  color: string;

  @FilterableField({ defaultValue: false })
  favorite: string;

  @FilterableField(() => ID, { nullable: false })
  creatorId: string;

  creator?: UserEntity;
}
