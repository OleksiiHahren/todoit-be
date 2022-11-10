import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ReminderCronService {

  @Cron('0 0 * * *')
  dailyReminder() {

  }

  @Cron('0 0 * * 0')
  remindAboutSkippedTasks() {

  }
}
