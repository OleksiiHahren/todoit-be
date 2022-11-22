import { Inject, Logger } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { QueryService } from '@nestjs-query/core';
import * as moment from 'moment/moment';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';
import { TaskEntity } from '@root/data-access/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Resolver(() => TaskDto)
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);

  constructor(
    @Inject('MomentWrapper') private momentWrapper: moment.Moment,
    @InjectRepository(TaskEntity)
    readonly taskService: QueryService<TaskDto>
  ) {
  }

  async getAllUpcomingTaskForRemind(): Promise<{ [key: string]: TaskDto[] }> {
    try {
      const startDay = this.momentWrapper.startOf('d').toDate();
      const endDay = this.momentWrapper.endOf('d').toDate();
      const tasks = await this.taskService.query({
        filter: {
          remind: { between: { lower: startDay, upper: endDay } },
          status: { neq: StatusesEnum.done }
        }
      });
      return this.groupByEmail(tasks);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getAllExpiredTaskForRemind(): Promise<{ [key: string]: TaskDto[] }> {
    try {
      const startDay = this.momentWrapper.startOf('d').toDate();
      const stackOfItems = await this.taskService.query({
        filter: {
          remind: { lt: startDay },
          status: { neq: StatusesEnum.done }
        }
      });
      return this.groupByEmail(stackOfItems);
    } catch (e) {
      this.logger.error(e);
    }
  }

  private groupByEmail(tasks: TaskDto[]): { [key: string]: TaskDto[] } {
    const resObj = {};
    tasks.forEach(el => {
      if (!resObj[el.creator.email]) {
        resObj[el.creator.email] = [];
      }
      resObj[el.creator.email].push(el);
    });
    return resObj;
  }
}
