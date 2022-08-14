import { ArgsType } from '@nestjs/graphql';
import { QueryArgsType } from '@nestjs-query/query-graphql';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';


@ArgsType()
export class TaskQuery extends QueryArgsType(TaskDto) {}
export const TaskConnection = TaskQuery.ConnectionType;
