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
import { UserDto } from '@root/modules/common/user/dto/user.dto';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { ProjectDto } from '@root/modules/projects/dto/project.dto';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { MarkEntity } from '@root/data-access/entities/mark.entity';
import { CreatedByHook } from '@root/modules/tasks/services/task-fill-data-hook.service';

@ObjectType('task')
/*@BeforeCreateOne((input: CreateOneInputType<TaskDto>, context) => {
  input.input.creator = context.req.user;
  return input;
})*/
@BeforeCreateOne(CreatedByHook)
@BeforeUpdateOne((input: UpdateOneInputType<TaskDto>, context) => {
  input.update.creator = context.user;
  return input;
})


@Relation('creator', () => UserDto, { disableRemove: false, nullable: false })
@Relation('project', () => ProjectDto, { disableRemove: false, nullable: true })
@Relation('priority', () => MarkDto, { disableRemove: false, nullable: true })
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
  markIds!: [number];

  @FilterableField(() => ID, { nullable: true })
  projectId!: string;

  @FilterableField({ nullable: true })
  remind: Date;

  @FilterableField()
  repeatRemind: boolean;

  @FilterableField({ nullable: false })
  order: number;

  @FilterableField({ nullable: true, defaultValue: StatusesEnum.relevant })
  @IsEnum(StatusesEnum)
  status: StatusesEnum;
/*
  @FilterableField(() => ID, { nullable: true })
  creatorId: string;*/

  creator?: UserEntity;

  project?: ProjectEntity;

  marks?: MarkEntity[];
}
