import { Inject, Logger } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ReminderDto } from '@root/modules/reminder/dto/reminder.dto';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { ReminderEntity } from '@root/data-access/entities/reminder.entity';
import * as moment from 'moment/moment';
import { Between } from 'typeorm';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';

@Resolver(() => ReminderDto)
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);

  constructor(
    @InjectQueryService(ReminderEntity) readonly reminderService: QueryService<ReminderDto>,
    @Inject('MomentWrapper') private momentWrapper: moment.Moment
  ) {
  }

  getAllUpcomingTaskForRemind() {
    const startDay = this.momentWrapper.startOf('d').toDate();
    const endDay = this.momentWrapper.endOf('d').toDate();

    this.reminderService.query({
      filter: {
        timeForRemind: { between: { lower: startDay, upper: endDay } },
        task: { status: { eq: StatusesEnum.relevant } }
      }
    });
  }

  getAllExpiredTaskForRemind() {
    const startDay = this.momentWrapper.startOf('d').toDate();

    this.reminderService.query({
      filter: {
        timeForRemind: { lt: startDay },
        task: { status: { eq: StatusesEnum.relevant } },
        and: [
          {
            task: { status: { eq: StatusesEnum.delayed } }
          }
        ]
      }
    });
  }
}
