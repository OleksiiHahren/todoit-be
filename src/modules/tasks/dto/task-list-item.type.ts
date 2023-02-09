import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  BeforeUpdateOne,
  CreateOneInputType,
  FilterableField, OffsetConnection,
  Relation, UpdateOneInputType
} from '@nestjs-query/query-graphql';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { IsEnum, IsOptional } from 'class-validator';
import { MarkDto } from '@root/modules/marks/dto/marks.dto';
import { UserDto } from '@root/modules/common/user/dto/user.dto';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { ProjectDto } from '@root/modules/projects/dto/project.dto';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { MarkEntity } from '@root/data-access/entities/mark.entity';
import { CreateTaskRelationsHook } from '@root/modules/tasks/services/task-fill-data-hook.service';
import { UpdateTaskRelationsHook } from '@root/modules/tasks/services/task-update-data-hook.service';
import { getFilterableFields } from '@nestjs-query/query-graphql/dist/src/decorators/filterable-field.decorator';

@ObjectType('task')
@BeforeCreateOne(CreateTaskRelationsHook)
@BeforeUpdateOne(UpdateTaskRelationsHook)

@Relation('creator', () => UserDto, { disableRemove: false, nullable: false })
@Relation('project', () => ProjectDto, { disableRemove: false, nullable: true })
@OffsetConnection('marks', () => MarkDto, { disableRemove: false, nullable: true })
export class TaskDto {
  @Field(() => ID)
  id: string;

  @FilterableField({ nullable: true })
  name: string;

  @FilterableField({ nullable: true })
  description: string;

  @FilterableField({ nullable: true })
  deadline: Date;

  @Field(() => [ID])
  @IsOptional()
  markIds?: number[];

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

  creator?: UserEntity;

  project?: ProjectEntity;

  marks?: MarkEntity[];
}
