import { Injectable } from '@nestjs/common';
import {
  BeforeCreateOneHook,
  BeforeUpdateOneHook,
  CreateOneInputType,
  UpdateOneInputType
} from '@nestjs-query/query-graphql';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { MarkEntity } from '@root/data-access/entities/mark.entity';

@Injectable()
export class UpdateTaskRelationsHook<T extends TaskDto>
  implements BeforeUpdateOneHook<T, { req: { user: UserEntity } }> {
  constructor(
    @InjectQueryService(ProjectEntity)
    readonly projectService: QueryService<ProjectEntity>,
    @InjectQueryService(MarkEntity)
    readonly markService: QueryService<MarkEntity>
  ) {
  }

  async run(
    instance: UpdateOneInputType<T>
  ): Promise<UpdateOneInputType<T>> {

    if (instance.update.projectId) {
      instance.update.project = await this.projectService.findById(
        instance.update.projectId
      );
    } else if (instance.update.projectId === null) {
      instance.update.project = null;
    }

    if (instance.update.markIds) {
      instance.update.marks = await this.markService.query({
        filter: {
          id: {
            in: instance.update.markIds
          }
        }
      });
    }

    return instance;
  }
}
