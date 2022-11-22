import { Module, Scope } from '@nestjs/common';
import { ReminderService } from '@root/modules/reminder/services/reminder.service';
import { ReminderCronService } from '@root/modules/reminder/services/reminder-cron.service';
import * as moment from 'moment/moment';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '@root/data-access/entities/task.entity';
import { EmailSendingModule } from '@root/modules/email-sending/email-sending.module';

@Module({
  providers: [
    ReminderService,
    ReminderCronService,
    {
      provide: 'MomentWrapper',
      useFactory: async () => moment(),
      scope: Scope.REQUEST
    }
  ],
  imports: [
    EmailSendingModule,
    TypeOrmModule.forFeature([TaskEntity])
  ]
})

export class ReminderModule {
}
