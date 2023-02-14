import { Inject, Logger } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import * as moment from 'moment/moment';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';
import { InjectRepository } from '@nestjs/typeorm';
import { RemindersEntity } from '@root/data-access/entities/reminders.entity';
import { Between, LessThan, Repository } from 'typeorm';
import { TaskEntity } from '@root/data-access/entities/task.entity';


@Resolver(() => TaskDto)
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);

  constructor(
    @Inject('MomentWrapper') private momentWrapper: moment.Moment,
    @InjectRepository(RemindersEntity) private readonly reminderService: Repository<RemindersEntity>
  ) {
  }

  async getAllUpcomingTaskForRemind(): Promise<{ [key: string]: TaskEntity[] }> {
    try {
      const startDay = this.momentWrapper.startOf('d').toDate();
      const endDay = this.momentWrapper.add(1, 'day').endOf('d').toDate();
      const tasks = await this.reminderService.find({
        relations: ['task', 'task.creator'],
        where: {
          certainTime: Between(startDay, endDay),
          task: { status: StatusesEnum.relevant }
        }
      });
      return this.groupByEmail(tasks);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getAllExpiredTaskForRemind(): Promise<{ [key: string]: TaskEntity[] }> {
    try {
      const startDay = this.momentWrapper.startOf('d').toDate();
      const stackOfItems = await this.reminderService.find({
        relations: ['task', 'task.creator'],
        where: {
          certainTime: LessThan(startDay),
          task: { status: StatusesEnum.relevant }
        }
      });
      stackOfItems.forEach((el) => console.log(el.task.creator));

      return this.groupByEmail(stackOfItems);
    } catch (e) {
      this.logger.error(e);
    }
  }

  private groupByEmail(tasks: RemindersEntity[]): { [key: string]: TaskEntity[] } {
    const resObj = {};
    if (tasks.length) {
      tasks.forEach((el) => {
        if (!resObj[el.task.creator.email]) {
          resObj[el.task.creator.email] = [];
        }
        resObj[el.task.creator.email].push(el.task);
      });
    }

    return resObj;
  }
}
