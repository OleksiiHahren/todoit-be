import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  BeforeUpdateOne,
  CreateOneInputType,
  FilterableField,
  Relation, UpdateOneInputType
} from '@nestjs-query/query-graphql';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { IsEnum } from 'class-validator';
import { MarkDto } from '@root/modules/marks/dto/marks.dto';
import { ReminderDto } from '@root/modules/reminder/dto/reminder.dto';
import { UserDto } from '@root/modules/common/user/dto/user.dto';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { ProjectDto } from '@root/modules/projects/dto/project.dto';

@ObjectType('task')
@BeforeCreateOne((input: CreateOneInputType<TaskDto>, context) => {
  input.input.creator = context.req.user;
  return input;
})
@BeforeUpdateOne((input: UpdateOneInputType<TaskDto>, context) => {
  input.update.creator = context.user;
  return input;
})
@Relation('creator', () => UserDto, { disableRemove: false, nullable: false })
@Relation('project', () => ProjectDto, { disableRemove: false, nullable: true })
@Relation('priority', () => MarkDto, { disableRemove: false, nullable: true })
@Relation('reminder', () => ReminderDto, { disableRemove: false, nullable: true })
export class TaskDto {
  @Field(type => ID)
  id: string;

  @FilterableField({ nullable: true })
  name: string;

  @FilterableField({ nullable: true })
  description: string;

  @FilterableField({ nullable: true })
  deadline: Date;

  @FilterableField(() => ID, { nullable: true })
  priorityId!: string;

  @FilterableField(() => ID, { nullable: true })
  projectId!: string;

  @FilterableField(() => ID, { nullable: true })
  reminderId!: string;

  @FilterableField({ nullable: false })
  order: number;

  @FilterableField({ nullable: true, defaultValue: StatusesEnum.relevant })
  @IsEnum(StatusesEnum)
  status: StatusesEnum;

  @FilterableField(() => ID, { nullable: true })
  creatorId: string;

  creator?: UserEntity;
}
