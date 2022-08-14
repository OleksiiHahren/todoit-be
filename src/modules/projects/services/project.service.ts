import { Resolver } from '@nestjs/graphql';
import { ProjectDto } from '@root/modules/projects/types/project.type';


@Resolver(() => ProjectDto)
export class ProjectService {

}
