import { ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  BeforeUpdateOne,
  CreateOneInputType,
  FilterableField, Relation, UnPagedRelation,
  UpdateOneInputType
} from '@nestjs-query/query-graphql';
import { UserDto } from '@root/modules/common/user/dto/user.dto';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';

@ObjectType('mark')
@BeforeCreateOne((input: CreateOneInputType<MarkDto>, context) => {
  input.input.creator = context.req.user;
  return input;
})
@BeforeUpdateOne((input: UpdateOneInputType<MarkDto>, context) => {
  input.update.creator = context.req.user;
  return input;
})
@Relation('creator', () => UserDto, { disableRemove: false, nullable: false })
@UnPagedRelation('tasks', () => TaskDto, { disableRemove: false, nullable: false })

export class MarkDto {
  @FilterableField(type => ID)
  id: string;

  @FilterableField()
  name: string;

  @FilterableField()
  color: string;

  @FilterableField(() => ID, { nullable: false })
  creatorId: string;

  @FilterableField({ nullable: false })
  favorite: boolean;

  creator?: UserEntity;

}
