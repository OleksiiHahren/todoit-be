import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';
import { Filter, InjectQueryService, QueryService, SortDirection } from '@nestjs-query/core';
import { TaskEntity } from '@root/data-access/entities/task.entity';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { MarkDto } from '@root/modules/marks/dto/marks.dto';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import * as moment from 'moment';
import { PaginationDto } from '@root/modules/common/dto/pagination.dto';
import { GqlAuthGuard } from '@root/guards/jwt.guard';
import { CurrentUser } from '@root/decorators/get-user.decorator';
import { ProjectDto } from '@root/modules/projects/dto/project.dto';
import { MarkEntity } from '@root/data-access/entities/mark.entity';

@Resolver(() => TaskDto)
export class TaskService {
  readonly statusesEnum = StatusesEnum;
  readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectQueryService(ProjectEntity) readonly projectService: QueryService<ProjectDto>,
    @InjectQueryService(MarkEntity) readonly markService: QueryService<MarkDto>,
    @InjectQueryService(TaskEntity) readonly serviceTask: QueryService<TaskDto>,
    @Inject('MomentWrapper') private momentWrapper: moment.Moment
  ) {
  }

  @Query(() => TaskDto)
  @UseGuards(GqlAuthGuard)
  async markAsCompleted(@Args('taskId') taskId: string): Promise<TaskDto> {
    try {
      const task = await this.serviceTask.findById(taskId);
      task.status = StatusesEnum.done;
      return await this.serviceTask.updateOne(task.id, task);
    } catch (e) {
      this.logger.error(e.message);
    }
  }


  @Query(() => [TaskDto])
  @UseGuards(GqlAuthGuard)
  async tasksForToday(@Args('paging') paging: PaginationDto, @CurrentUser() user) {
    try {
      const { offset, limit } = paging;
      const todayStart = this.momentWrapper.subtract(2, 'd').endOf('d').toDate();
      const todayEnd = this.momentWrapper.add(2, 'd').startOf('d').toDate();
      const filter: Filter<TaskDto> = {
        creator: { id: { eq: user.id } },
        status: { eq: this.statusesEnum.relevant },
        and: [
          {
            deadline: { between: { lower: todayStart, upper: todayEnd } }
          }
        ]
      };
      return await this.serviceTask.query({
        filter,
        paging: { offset, limit },
        sorting: [{ field: 'updatedAt', direction: SortDirection.DESC }]

      });
    } catch (e) {
      this.logger.error(e);
    }

  }

  @Query(() => [TaskDto])
  @UseGuards(GqlAuthGuard)
  async tasksForFuture(@Args('paging') paging: PaginationDto, @CurrentUser() user) {
    const { offset, limit } = paging;
    const todayEnd = this.momentWrapper.endOf('d').toDate();
    const filter: Filter<TaskDto> = {
      creator: { id: { eq: user.id } },
      status: { eq: this.statusesEnum.relevant },
      and: [
        {
          deadline: { gt: todayEnd }
        }
      ]
    };
    return await this.serviceTask.query({
      filter,
      sorting: [{ field: 'updatedAt', direction: SortDirection.DESC }],
      paging: { offset, limit }
    });
  }

  @Query(() => [TaskDto])
  @UseGuards(GqlAuthGuard)
  async taskIncomes(@Args('paging') paging: PaginationDto, @CurrentUser() user): Promise<TaskDto[]> {
    const { offset, limit } = paging;

    const filter: Filter<TaskDto> = {
      creator: { id: { eq: user.id } },
      status: { eq: this.statusesEnum.relevant }
    };

    return await this.serviceTask.query({
      filter,
      paging: { offset, limit }, sorting: [{ field: 'updatedAt', direction: SortDirection.DESC }]
    });
  }

  @Mutation(() => [TaskDto])
  @UseGuards(GqlAuthGuard)
  async changePriority(
    @Args('ids', { type: () => [String] }) ids: [string],
    @CurrentUser() user
  ): Promise<TaskDto[]> {
    const tasksForUpdate = [];
    for (let i = ids.length - 1; i >= 0; i--) {
      tasksForUpdate.push(
        this.serviceTask.updateOne(
          ids[i],
          { updatedAt: moment().utc(true).toDate() },
          {
            filter: { creator: { id: { eq: user.id } } }
          }
        )
      );
    }
    return await Promise.all(tasksForUpdate);
  }
}
