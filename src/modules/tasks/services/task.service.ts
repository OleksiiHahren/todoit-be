import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';
import { Filter, InjectQueryService, QueryService } from '@nestjs-query/core';
import { TaskEntity } from '@root/data-access/entities/task.entity';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { TaskInputDto } from '@root/modules/tasks/dto/task.input.dto';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { MarkEntity } from '@root/data-access/entities/priority.entity';
import { MarkDto } from '@root/modules/marks/dto/marks.dto';
import { Inject, UseGuards } from '@nestjs/common';
import * as moment from 'moment';
import { PaginationDto } from '@root/modules/common/dto/pagination.dto';
import { GqlAuthGuard } from '@root/guards/jwt.guard';
import { CurrentUser } from '@root/decorators/get-user.decorator';
import { ProjectDto } from '@root/modules/projects/dto/project.dto';

@Resolver(() => TaskDto)
export class TaskService {
  readonly statusesEnum = StatusesEnum;

  constructor(
    @InjectQueryService(ProjectEntity) readonly projectService: QueryService<ProjectDto>,
    @InjectQueryService(MarkEntity) readonly markService: QueryService<MarkDto>,
    @InjectQueryService(TaskEntity) readonly serviceTask: QueryService<TaskDto>,
    @Inject('MomentWrapper') private momentWrapper: moment.Moment
  ) {
  }

  async markAllAsCompleted(): Promise<number> {
    const entities = await this.serviceTask.query({ filter: { deadline: { is: null } } });

    return entities.length;
  }


  @Query(() => [TaskDto])
  @UseGuards(GqlAuthGuard)
  async tasksForToday(@Args('paging') paging: PaginationDto) {
    const { offset, limit } = paging;
    const tomorrow = this.momentWrapper.add(1, 'd').toDate();
    const yesterday = this.momentWrapper.subtract(1, 'd').toDate();

    return await this.serviceTask.query({
      filter: {
        status: { neq: this.statusesEnum.done },
        deadline: { between: { lower: yesterday, upper: tomorrow } }
      },
      paging: { offset, limit }
    });
  }

  @Query(() => [TaskDto])
  @UseGuards(GqlAuthGuard)
  async tasksForTomorrow(@Args('paging') paging: PaginationDto) {
    const { offset, limit } = paging;
    const dayAfterTomorrow = this.momentWrapper.add(1, 'd').startOf('d').toDate();
    const today = this.momentWrapper.add(1, 'd').startOf('d').toDate();

    return await this.serviceTask.query({
      filter: {
        status: { neq: this.statusesEnum.done },
        deadline: { between: { lower: dayAfterTomorrow, upper: today } }
      },
      paging: { offset, limit }
    });
  }

  @Query(() => [TaskDto])
  @UseGuards(GqlAuthGuard)
  async taskIncomes(@Args('paging') paging: PaginationDto, @CurrentUser() user): Promise<TaskDto[]> {
    const { offset, limit } = paging;
    const yesterdayEnd = this.momentWrapper
      .subtract(1, 'd')
      .endOf('d')
      .toDate();
    const todayEnd = this.momentWrapper.add(1, 'd').endOf('d').toDate();
    const filter: Filter<TaskDto> = {
      creator: { id: { eq: user.id } },
      status: { eq: this.statusesEnum.relevant },
      and: [
        {
          deadline: { lte: todayEnd }
        }
      ]
    };

    return await this.serviceTask.query({ filter, paging: { offset, limit } });
  }

  @Mutation(() => TaskDto)
  @UseGuards(GqlAuthGuard)
  async createTaskWithAllDetails(@Args('data') data: TaskInputDto, @CurrentUser() user) {
    const { projectId, markIds, reminderId, creatorId } = data;
    data.creatorId = user.id;
    data.creator = user;
    let task;
    try {
      task = await this.serviceTask.createOne(data);

    } catch (e) {
      console.error(e);
    }

    if (projectId) {
      await this.fillProjectData(task.id, projectId);
    }
    if (markIds) {
      await this.fillMarksData(task.id, markIds);
    }
    if (reminderId) {
      await this.fillRemindersData(task.id, reminderId);
    }
    return task;
  }

  private async fillProjectData(taskId, projectId): Promise<void> {
    const project = await this.projectService.findById(projectId);
    await this.serviceTask.setRelation(
      'project',
      taskId,
      project.id
    );
  }

  private async fillMarksData(taskId, markIds: string[]): Promise<void> {
    const marks = await this.markService.query({ filter: { id: { in: markIds } } });
    await this.serviceTask.setRelations(
      'project',
      taskId,
      marks.map((el: MarkDto) => el.id)
    );
  }

  private fillRemindersData(taskId, projectId): Promise<void> {
    return;
  }
}
