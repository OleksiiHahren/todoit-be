import {
  FilterableField,
  UpdateOneInputType
} from '@nestjs-query/query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';
import { IsOptional } from 'class-validator';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { MarkEntity } from '@root/data-access/entities/mark.entity';

@InputType('taskInput')
export class TaskInputDto {

  @FilterableField()
  name: string;

  @FilterableField()
  @IsOptional()
  description: string;

  @FilterableField({ nullable: true })
  deadline: Date;

  @FilterableField({ defaultValue: StatusesEnum.relevant })
  status: StatusesEnum;

  @Field()
  @IsOptional()
  markIds: number[];

  @FilterableField(() => ID, { nullable: true })
  @IsOptional()
  projectId: string;

  @FilterableField()
  @IsOptional()
  reminder: Date;

  @FilterableField({ defaultValue: false })
  repeatReminder: boolean;

  @FilterableField(() => ID, { nullable: true })
  @IsOptional()
  creatorId: string;

  creator?: UserEntity;

  project?: ProjectEntity;

  marks?: MarkEntity[];
}

@InputType()
export class UpdateOneTaskItemInput extends UpdateOneInputType(
  TaskDto,
  TaskInputDto
) {
}
