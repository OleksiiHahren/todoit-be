import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { ProjectService } from '@root/modules/projects/services/project.service';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { GqlAuthGuard } from '@root/guards/jwt.guard';
import { ProjectDto } from '@root/modules/projects/types/project.type';
import { CommonModule } from '@root/modules/common/common.module';

@Module({
  providers: [ProjectService],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        CommonModule,
        NestjsQueryTypeOrmModule.forFeature([ProjectEntity]),
      ],
      assemblers: [],
      resolvers: [
        {
          create: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          update: { many: { disabled: true } },
          DTOClass: ProjectDto,
          EntityClass: ProjectEntity,
          guards: [GqlAuthGuard],
        },
      ],
    }),
  ],
})
export class ProjectsModule {}
