import { FilterableField, Relation, UpdateOneInputType } from '@nestjs-query/query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';
import { IsOptional } from 'class-validator';

@InputType('taskInput')
export class TaskInputDto {

  @FilterableField()
  name: string;

  @FilterableField()
  @IsOptional()
  description: string;

  @FilterableField()
  deadline: Date;

  @FilterableField(() => ID,{ nullable: true })
  @IsOptional()
  markIds: string[];

  @FilterableField(() => ID, { nullable: true })
  @IsOptional()
  projectId: string;

  @FilterableField(() => ID, { nullable: true })
  @IsOptional()
  reminderId: string;
}

@InputType()
export class UpdateOneTaskItemInput extends UpdateOneInputType(
  TaskDto,
  TaskInputDto
) {
}
