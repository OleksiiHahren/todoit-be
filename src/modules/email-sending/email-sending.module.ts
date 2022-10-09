import { Module } from '@nestjs/common';
import { MailgunService } from 'nestjs-mailgun';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReminderEntity } from '@root/data-access/entities/reminder.entity';
import { ReminderService } from '@root/modules/reminder/services/reminder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReminderEntity])
  ],
  providers: [MailgunService, ReminderService]
})
export class EmailSendingModule {
}
