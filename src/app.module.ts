import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@root/modules/common/common.module';
import { TasksModule } from '@root/modules/tasks/tasks.module';
import { ProjectsModule } from '@root/modules/projects/projects.module';
import { PrioritiesModule } from '@root/modules/priorities/priorities.module';
import { ReminderModule } from '@root/modules/reminder/reminder.module';

@Module({
  imports: [
    CommonModule,
    TasksModule,
    ProjectsModule,
    PrioritiesModule,
    ReminderModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
