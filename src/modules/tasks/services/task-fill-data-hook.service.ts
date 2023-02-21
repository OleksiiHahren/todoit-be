import { Injectable } from '@nestjs/common';
import { BeforeCreateOneHook, CreateOneInputType } from '@nestjs-query/query-graphql';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { MarkEntity } from '@root/data-access/entities/mark.entity';
import { RemindersEntity } from '@root/data-access/entities/reminders.entity';

@Injectable()
export class CreateTaskRelationsHook<T extends TaskDto>
  implements BeforeCreateOneHook<T, { req: { user: UserEntity } }> {
  constructor(
    @InjectQueryService(ProjectEntity)
    readonly projectService: QueryService<ProjectEntity>,
    @InjectQueryService(MarkEntity)
    readonly markService: QueryService<MarkEntity>
  ) {
  }

  async run(
    instance: CreateOneInputType<T>,
    context: { req: { user: UserEntity } }
  ): Promise<CreateOneInputType<T>> {
    const { user } = context.req;
    instance.input.creator = user;
    if (instance.input.reminderTime) {
      const reminder = new RemindersEntity();
      reminder.certainTime = instance.input.reminderTime;
      reminder.notifyIfOverdue = instance.input.repeatReminder;
      instance.input.reminder = reminder;
    }
    if (instance.input.projectId) {
      instance.input.project = await this.projectService.findById(
        instance.input.projectId
      );
    }
    if (instance.input?.markIds) {
      instance.input.marks = await this.markService.query({
        filter: {
          id: {
            in: instance.input?.markIds
          }
        }
      });
    }
    return instance;
  }
}
