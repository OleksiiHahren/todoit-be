import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { ProjectService } from '@root/modules/projects/services/project.service';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { GqlAuthGuard } from '@root/guards/jwt.guard';
import { CommonModule } from '@root/modules/common/common.module';
import { ProjectDto } from '@root/modules/projects/dto/project.dto';

@Module({
  providers: [ProjectService],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        CommonModule,
        NestjsQueryTypeOrmModule.forFeature([ProjectEntity])
      ],
      assemblers: [],
      resolvers: [
        {
          read: { disabled: true },
          create: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          update: { many: { disabled: true } },
          DTOClass: ProjectDto,
          EntityClass: ProjectEntity,
          guards: [GqlAuthGuard]
        }
      ]
    })
  ]
})
export class ProjectsModule {
}
