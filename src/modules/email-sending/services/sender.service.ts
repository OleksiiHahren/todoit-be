import { Injectable, Logger } from '@nestjs/common';
import { MailgunService } from 'nestjs-mailgun';

@Injectable()
export class SenderService {
  logger = new Logger(SenderService.name);

  constructor(private mailgunService: MailgunService) {
  }

  sendTaskReminder(email, data) {
    try {
      return this.mailgunService.createEmail(email, data);
    } catch (e) {
      this.logger.error(e);
    }
  }

  sendAboutExpiredTasks() {

  }

  sendRegistrationGreeting() {

  }

  sendPasswordChangeInfo() {

  }

}
