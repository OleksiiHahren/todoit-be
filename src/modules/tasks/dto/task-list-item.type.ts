import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { ProjectDto } from '@root/modules/projects/types/project.type';
import { IsEnum } from 'class-validator';
import { MarkDto } from '@root/modules/marks/dto/marks.dto';
import { ReminderDto } from '@root/modules/reminder/dto/reminder.dto';

@ObjectType('task')
@Relation('project', () => ProjectDto, { disableRemove: true, nullable: true })
@Relation('priority', () => MarkDto, { disableRemove: true, nullable: true })
@Relation('reminder', () => ReminderDto, { disableRemove: true, nullable: true })
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

  @FilterableField(() => ID,{ nullable: true })
  projectId!: string;

  @FilterableField(() => ID, { nullable: true })
  reminderId!: string;

  @FilterableField()
  @IsEnum(StatusesEnum)
  status: StatusesEnum;

}
