import { ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { IsDate } from 'class-validator';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';

@ObjectType('reminder')
@Relation('task', () => TaskDto, { disableRemove: false, nullable: false })
export class ReminderDto {
  @FilterableField(type => ID)
  id: string;

  @FilterableField()
  repeatInterval: string;

  @FilterableField()
  @IsDate()
  timeForRemind: Date;

  @FilterableField()
  task: TaskDto;

}
