import { Inject, Logger } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { QueryService } from '@nestjs-query/core';
import * as moment from 'moment/moment';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';
import { TaskEntity } from '@root/data-access/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RemindersEntity } from '@root/data-access/entities/reminders.entity';
import { ReminderDto } from '@root/modules/reminder/services/dto/reminder.dto';


@Resolver(() => TaskDto)
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);

  constructor(
    @Inject('MomentWrapper') private momentWrapper: moment.Moment,
    @InjectRepository(TaskEntity) private readonly taskService: QueryService<TaskDto>,
    @InjectRepository(RemindersEntity) private readonly reminderQueryService: QueryService<ReminderDto>
  ) {
  }

  async getAllUpcomingTaskForRemind(): Promise<{ [key: string]: TaskDto[] }> {
    try {
      const startDay = this.momentWrapper.startOf('d').toDate();
      const endDay = this.momentWrapper.endOf('d').toDate();
      const tasks = await this.reminderQueryService.query({
        filter: {
          certainTime: { between: { lower: startDay, upper: endDay } },
          task: { status: { neq: StatusesEnum.done } }
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
      const stackOfItems = await this.reminderQueryService.query({
        filter: {
          certainTime: { lt: startDay },
          notifyIfOverdue: { is: true },
          task: { status: { neq: StatusesEnum.done } }
        }
      });
      return this.groupByEmail(stackOfItems);
    } catch (e) {
      this.logger.error(e);
    }
  }

  private groupByEmail(tasks: ReminderDto[]): { [key: string]: TaskDto[] } {
    const resObj = {};
    tasks.forEach((el) => {
      if (!resObj[el.task.creator.email]) {
        resObj[el.task.creator.email] = [];
      }
      resObj[el.task.creator.email].push(el);
    });
    return resObj;
  }
}
