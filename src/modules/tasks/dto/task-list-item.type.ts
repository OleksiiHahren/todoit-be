import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { ProjectDto } from '@root/modules/projects/types/project.type';
import { PriorityDto } from '@root/modules/priorities/dto/priority.dto';
import { IsEnum } from 'class-validator';

@ObjectType('task')
@Relation('project', () => ProjectDto, { disableRemove: true, nullable: true })
@Relation('priority', () => PriorityDto, { disableRemove: true, nullable: true })
@Relation('reminder', () => PriorityDto, { disableRemove: true, nullable: true })
export class TaskDto {
  @Field(type => ID)
  id: string;

  @FilterableField()
  name: string;

  @FilterableField()
  description: string;

  @FilterableField()
  deadline: Date;

  @FilterableField(() => ID)
  priorityId!: string;

  @FilterableField(() => ID)
  projectId!: string;

  @FilterableField(() => ID)
  reminderId!: string;

  @FilterableField()
  @IsEnum(StatusesEnum)
  status: StatusesEnum;

}
