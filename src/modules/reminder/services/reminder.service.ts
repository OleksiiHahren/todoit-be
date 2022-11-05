import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailReminderRepository } from '@root/modules/email-sending/repository/email-reminder-repository';

@Injectable()
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);
  constructor(private reminderRepo: EmailReminderRepository) {
  }
  @Cron('0 0 * * *')
  dailyReminder() {
    const targetItems = this.reminderRepo.getAllForRemind();

  }

  @Cron('0 0 * * 0')
  remindAboutSkippedTasks() {
    return this.reminderRepo.getAllSkippedTasks()
  }
}
