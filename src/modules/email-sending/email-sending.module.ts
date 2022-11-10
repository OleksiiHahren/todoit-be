import { Module } from '@nestjs/common';
import { MailgunModule } from 'nestjs-mailgun';
import { ReminderService } from '@root/modules/reminder/services/reminder.service';
import { SenderService } from '@root/modules/email-sending/services/sender.service';
import mailgunConfig from '@root/modules/common/config/mailgun.config';

@Module({
  imports: [
    MailgunModule.forRoot(mailgunConfig),
  ],
  providers: [ReminderService, SenderService]
})
export class EmailSendingModule {
}
