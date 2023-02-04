import {
  FilterableField,
  UpdateOneInputType
} from '@nestjs-query/query-graphql';
import { ID, InputType } from '@nestjs/graphql';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';
import { IsOptional } from 'class-validator';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';

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

  @FilterableField(() => ID, { nullable: true })
  @IsOptional()
  markIds: string[];

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
}

@InputType()
export class UpdateOneTaskItemInput extends UpdateOneInputType(
  TaskDto,
  TaskInputDto
) {
}
