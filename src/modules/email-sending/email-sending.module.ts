import { Module } from '@nestjs/common';
import { MailgunService } from 'nestjs-mailgun';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReminderService } from '@root/modules/reminder/services/reminder.service';
import { EmailReminderRepository } from '@root/modules/email-sending/repository/email-reminder-repository';
import { SenderService } from '@root/modules/email-sending/services/sender.service';

@Module({
  imports: [

    TypeOrmModule.forFeature([EmailReminderRepository])
  ],
  providers: [MailgunService, ReminderService, SenderService]
})
export class EmailSendingModule {
}
