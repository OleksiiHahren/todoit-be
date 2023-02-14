import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { TaskEntity } from '@root/data-access/entities/task.entity';

@Injectable()
export class SenderService {
  logger = new Logger(SenderService.name);

  constructor(private mailerService: MailerService) {
  }

  async sendTaskReminder(email, tasks: TaskEntity[]) {
    try {
      if (tasks.length) {
        const userName = `${tasks[0].creator.firstName} ${tasks[0].creator.lastName}`;
        return await this.mailerService.sendMail({
          to: email,
          from: '"Support Team TodoIt" <todoit@example.com>',
          subject: 'Dont forget about important tasks for today!',
          template: './reminder-info',
          context: {
            username: userName,
            tasks: tasks.map(
              (el: TaskEntity) => `${el.name}\n ${el.description}`
            ),
            message: `Here your notice for task what you going to do for today`
          }
        });
      }
    } catch (e) {
      this.logger.error(`send task reminder is failed with error:`, e.error);
    }

  }

  async sendTaskExpiredReminder(email, tasks: TaskEntity[]) {
    try {
      if (tasks.length) {
        const userName = `${tasks[0].creator.firstName} ${tasks[0].creator.lastName}`;
        return await this.mailerService.sendMail({
          to: email,
          from: '"Support Team TodoIt" <todoit@example.com>',
          subject: 'Expired tasks',
          template: './reminder-info',
          context: {
            username: userName,
            tasks: tasks.map(
              (el: TaskEntity) => `${el.name}\n ${el?.description}`
            ),
            message: `Dont forget about this delayed tasks in your list`
          }
        });
      }
    } catch (e) {
      this.logger.error(
        `send overdue tasks notification is failed with message:`,
        e.message);
    }
  }

  changedPasswordMessage(email: string): Promise<SentMessageInfo> {
    try {
      return this.mailerService.sendMail({});
    } catch (e) {

    }
  }

  newUserGreating(user: UserEntity): Promise<SentMessageInfo> {
    try {
      return this.mailerService.sendMail({
        to: user.email,
        from: '"Support Team TodoIt" <todoit@example.com>',
        subject: 'Greatings!',
        template: './new-user-invitation',
        context: {
          username: user.firstName,
          message: `Dear friend nice to see you registration on our web app witch make your daily task management quiet 
          easier!`
        }

      });
    } catch (e) {
      this.logger.error(`new user greetings failed with error:`, e.error);
    }
  }

}
