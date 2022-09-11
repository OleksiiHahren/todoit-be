import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Filter, InjectQueryService, QueryService } from '@nestjs-query/core';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@root/guards/jwt.guard';
import { CurrentUser } from '@root/decorators/get-user.decorator';
import { ProjectDto } from '@root/modules/projects/dto/project.dto';


@Resolver(() => ProjectDto)
export class ProjectService {
  constructor(
    @InjectQueryService(ProjectEntity) private projectService: QueryService<ProjectDto>
  ) {
  }

  @Query(() => [ProjectDto])
  @UseGuards(GqlAuthGuard)
  async getOwnProjects(@CurrentUser() user): Promise<ProjectDto[]> {
    return await this.projectService.query({
      filter: { creator: { id: { eq: user.id } } }
    });
  }

  @Query(() => [ProjectDto])
  @UseGuards(GqlAuthGuard)
  async getFavoriteProjects(@CurrentUser() user): Promise<ProjectDto[]> {
    const filter: Filter<ProjectDto> = {
      and: [
        {
          creator: { id: { eq: user.id } }
        },
        {
          favorite: { is: true }
        }
      ]
    };

    return await this.projectService.query({ filter });
  }

  @Mutation(() => ProjectDto)
  @UseGuards(GqlAuthGuard)
  async deleteMyProject(id: string, @CurrentUser() user): Promise<ProjectDto> {
    return await this.projectService.deleteOne(id, {
      filter: { creator: { id: { eq: user.id } } }
    });
  }

  @Mutation(() => ProjectDto)
  @UseGuards(GqlAuthGuard)
  async removeFromFavoriteProjects(
    id: string,
    @CurrentUser() user,
  ): Promise<ProjectDto> {
    const targetProject = await this.projectService.getById(id, { filter: { creator: { id: { eq: user.id } } } });
    targetProject.favorite = false;
    return await this.projectService.updateOne(targetProject.id, targetProject);
  }
}
