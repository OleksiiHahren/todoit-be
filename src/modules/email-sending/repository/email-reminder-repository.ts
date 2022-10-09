import { Between, EntityRepository, LessThan, Repository } from 'typeorm';
import { ReminderEntity } from '@root/data-access/entities/reminder.entity';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import * as moment from 'moment';

@EntityRepository(ReminderEntity)
export class EmailReminderRepository
  extends Repository<ReminderEntity> {

  getAllForRemind(): Promise<ReminderEntity[]> {
    const yesterday = moment().subtract(1, 'd').endOf('d');
    const tomorrow = moment().add(1, 'd').startOf('d');
    return this.find({
      where: {
        status: StatusesEnum.relevant,
        timeForRemind: Between(yesterday, tomorrow)
      }
    });
  }

  getAllSkippedTasks(): Promise<ReminderEntity[]> {
    const today = moment().toDate();
    return this.find({
      relations: ['task'],
      where: {
        status: StatusesEnum.relevant,
        task: { status: StatusesEnum.relevant, deadline: LessThan(today) }
      },
    });
  }
}
