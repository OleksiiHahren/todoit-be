import { Inject, Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
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
    @InjectRepository(TaskEntity) readonly taskService: QueryService<TaskEntity>
  ) {
  }

  @Query(() => [TaskDto])
  getAllUpcomingTaskForRemind() {
    try {
      const startDay = this.momentWrapper.startOf('d').toDate();
      const endDay = this.momentWrapper.endOf('d').toDate();

      return this.taskService.query({
        filter: {
          remind: { between: { lower: startDay, upper: endDay } },
          status: { neq: StatusesEnum.done }
        }
      });
    } catch (e) {
      this.logger.error(e);
    }

  }

  @Query(() => [TaskDto])
  getAllExpiredTaskForRemind() {
    try {
      const startDay = this.momentWrapper.startOf('d').toDate();

      return this.taskService.query({
        filter: {
          remind: { lt: startDay },
          status: { neq: StatusesEnum.done }
        }
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

}
