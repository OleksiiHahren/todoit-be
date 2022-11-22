import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';

@Injectable()
export class SenderService {
  logger = new Logger(SenderService.name);

  constructor(private mailerService: MailerService) {
  }

  async sendTaskReminder(email, tasks: TaskDto[]) {
    try {
      const userName = `${tasks[0].creator.firstName} ${tasks[0].creator.lastName}`;
      return await this.mailerService.sendMail({
        to: email,
        from: '"Support Team" <todoit@example.com>',
        subject: 'Dont forget about important tasks for today!',
        template: './reminder-info',
        context: {
          username: userName,
          tasks: tasks.map(
            (el: TaskDto) => `${el.name}\n ${el.description}`,
          ),
          message: `Here your notice for task what you going to do for today`
        }
      });
    } catch (e) {
      this.logger.error(e);
    }

  }

  async sendTaskExpiredReminder(email, tasks: TaskDto[]) {
    try {
      const userName = `${tasks[0].creator.firstName} ${tasks[0].creator.lastName}`;
      return await this.mailerService.sendMail({
        to: email,
        from: '"Support Team" <todoit@example.com>',
        subject: 'Expired tasks',
        template: './reminder-info',
        context: {
          username: userName,
          tasks: tasks.map(
            (el: TaskDto) => `${el.name}\n ${el.description}`,
          ),
          message: `Dont forget about this delayed tasks in your list`
        }
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

}
