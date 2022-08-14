import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { TaskEntity } from '@root/data-access/entities/task.entity';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { TaskConnection } from '@root/modules/tasks/dto/task-connection.dto';
import { TaskInputDto } from '@root/modules/tasks/dto/task.input.dto';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { ProjectDto } from '@root/modules/projects/types/project.type';

@Resolver(() => TaskDto)
export class TaskService {
  readonly statusesEnum = StatusesEnum;

  constructor(
    @InjectQueryService(ProjectEntity) readonly projectService: QueryService<ProjectDto>,
    @InjectQueryService(TaskEntity) readonly service: QueryService<TaskDto>
  ) {
  }

  @Query(() => TaskConnection)
  async undoneTasks() {
    return await this.service.query({
      filter: {
        status: { neq: this.statusesEnum.done }
      }
    });
  }

  @Mutation(() => TaskDto)
  async createTaskWithAllDetails(@Args('data') data: TaskInputDto) {
    const { projectId, priorityId, reminderId } = data;
    const task = await this.service.createOne(data);
    if (projectId) {
      const project = await this.projectService.findById(projectId);
      return await this.service.setRelation(
        'project',
        task.id,
        project.id
      );
    }
  }

}
