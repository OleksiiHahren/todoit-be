import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ReminderService } from '@root/modules/reminder/services/reminder.service';
import { SenderService } from '@root/modules/email-sending/services/sender.service';

@Injectable()
export class ReminderCronService {
  readonly logger = new Logger(ReminderCronService.name);

  constructor(
    private readonly reminderService: ReminderService,
    private readonly emailSendingService: SenderService) {
  }

  @Cron('0 0 * * *')
  async dailyReminder() {
    try {
      const emailsForSend = [];
      const aggregatedTasks =
        await this.reminderService.getAllUpcomingTaskForRemind();
      Object.keys(aggregatedTasks).forEach((email) =>
        emailsForSend.push(
          this.emailSendingService.sendTaskReminder(
            email,
            aggregatedTasks[email]
          )
        )
      );
      return Promise.all(emailsForSend);
    } catch (e) {
      this.logger.error('dailyReminder error with message -', e.error);
    }

  }


  @Cron('0 0 * * 0')
  async remindAboutSkippedTasks() {
    try {
      const emailsForSend = [];
      const expiredTasks =
        await this.reminderService.getAllExpiredTaskForRemind();
      Object.keys(expiredTasks).forEach((email) =>
        emailsForSend.push(
          this.emailSendingService.sendTaskExpiredReminder(
            email,
            expiredTasks[email]
          )
        )
      );
      return Promise.all(emailsForSend);
    } catch (e) {
      this.logger.error('expired reminder error with message -', e.error);
    }
  }
}
