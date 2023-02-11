import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchResultDto } from '@root/modules/global-search/dto/search.dto';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { MarkEntity } from '@root/data-access/entities/mark.entity';
import { MarkDto } from '@root/modules/marks/dto/marks.dto';
import { TaskEntity } from '@root/data-access/entities/task.entity';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { ProjectDto } from '@root/modules/projects/dto/project.dto';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@root/guards/jwt.guard';
import { CurrentUser } from '@root/decorators/get-user.decorator';

@Resolver(() => SearchResultDto)
export class SearchService {

  constructor(
    @InjectQueryService(MarkEntity) private readonly markQueryService: QueryService<MarkDto>,
    @InjectQueryService(TaskEntity) private readonly taskQueryService: QueryService<TaskDto>,
    @InjectQueryService(ProjectEntity)
    private projectService: QueryService<ProjectDto>
  ) {
  }

  readonly logger = new Logger(SearchService.name);

  @Query(() => [SearchResultDto])
  @UseGuards(GqlAuthGuard)
  async searchAllSameItems(
    @CurrentUser() user,
    @Args('searchValue') searchValue: string
  ): Promise<SearchResultDto[]> {
    const marks = await this._findAllMarks(searchValue, user.id);
    const tasks = await this._findAllTask(searchValue, user.id);
    const projects = await this._findAllProject(searchValue, user.id);
    const res = [];

    if (marks.length) {
      res.push(...this._fillResponse(marks, 'mark'));
    }
    if (tasks.length) {
      res.push(...this._fillResponse(tasks, 'task'));
    }
    if (projects.length) {
      res.push(...this._fillResponse(projects, 'project'));
    }
    console.log(res)
    return res;
  }

  private async _findAllMarks(
    searchValue: string,
    userId: number
  ): Promise<MarkDto[]> {
    try {
      return this.markQueryService.query({
        filter: {
          name: { like: `%${searchValue}%` },
          creator: { id: { eq: userId } }
        }
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  private _findAllProject(
    searchValue: string,
    userId: number
  ): Promise<ProjectDto[]> {
    try {
      return this.projectService.query({
        filter: {
          name: { like: `%${searchValue}%` },
          creator: { id: { eq: userId } }
        }
      });
    } catch (e) {
      this.logger.error(e);
    }

  }

  private _findAllTask(
    searchValue: string,
    userId: number
  ): Promise<TaskDto[]> {
    try {
      return this.taskQueryService.query({
        filter: {
          name: { like: `%${searchValue}%` },
          creator: { id: { eq: userId } }
        }
      });
    } catch (e) {
      this.logger.error(e);
    }


  }

  private _fillResponse(
    data: ProjectDto[] | TaskDto[] | MarkDto[],
    type: 'project' | 'task' | 'mark'
  ): SearchResultDto[] {
    return data.map(
      (el) => new SearchResultDto(el.id, el.name, type, el?.color || null)
    );
  }
}

