import { ObjectType } from '@nestjs/graphql';
import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';

@ObjectType('reminder')
@Relation('task', () => TaskDto, { disableRemove: true, nullable: false })
export class ReminderDto {

  @FilterableField()
  id: number;

  @FilterableField({ nullable: true })
  certainTime: Date;

  @FilterableField({ defaultValue: false })
  notifyIfOverdue: boolean;

  task: TaskDto;
}
