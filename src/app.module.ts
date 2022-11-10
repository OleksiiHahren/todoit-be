import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@root/modules/common/common.module';
import { TasksModule } from '@root/modules/tasks/tasks.module';
import { ProjectsModule } from '@root/modules/projects/projects.module';
import { ReminderModule } from '@root/modules/reminder/reminder.module';
import { MarkModule } from '@root/modules/marks/mark.module';
import { EmailSendingModule } from '@root/modules/email-sending/email-sending.module';

@Module({
  imports: [
    CommonModule,
    TasksModule,
    ProjectsModule,
    MarkModule,
    ReminderModule,
    EmailSendingModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
