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

  @Cron('* * * * *')
  async dailyReminder(): Promise<void> {
    try {
      const emailsForSend = [];
      const aggregatedTasks =
        await this.reminderService.getAllUpcomingTaskForRemind();

      Object.keys(aggregatedTasks).forEach((email: string) =>
        emailsForSend.push(
          this.emailSendingService.sendTaskReminder(
            email,
            aggregatedTasks[email]
          )
        )
      );
      if (emailsForSend.length) {
        await Promise.all(emailsForSend);
      }
    } catch (e) {
      this.logger.error('dailyReminder error with message -', e.error);
    }

  }


  @Cron('30 12 * * 1')
  async remindAboutSkippedTasks(): Promise<void> {
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
      if (emailsForSend.length) {
        await Promise.all(emailsForSend);
      }
    } catch (e) {
      this.logger.error('expired reminder error with message -', e.error);
    }
  }
}
