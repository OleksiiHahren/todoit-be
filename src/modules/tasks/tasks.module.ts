import { Module, Scope } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TaskService } from '@root/modules/tasks/services/task.service';
import { TaskDto } from '@root/modules/tasks/dto/task-list-item.type';
import { TaskEntity } from '@root/data-access/entities/task.entity';
import { GqlAuthGuard } from '@root/guards/jwt.guard';
import { CommonModule } from '@root/modules/common/common.module';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { MarkEntity } from '@root/data-access/entities/priority.entity';
import * as moment from 'moment';

@Module({
  providers: [
    TaskService,
    {
      provide: 'MomentWrapper',
      useFactory: async () => moment(),
      scope: Scope.REQUEST,
    },
  ],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        CommonModule,
        NestjsQueryTypeOrmModule.forFeature([
          TaskEntity,
          ProjectEntity,
          MarkEntity,
        ])
      ],
      assemblers: [],
      resolvers: [
        {
          guards: [GqlAuthGuard],
          create: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          update: { many: { disabled: true } },
          DTOClass: TaskDto,
          EntityClass: TaskEntity
        }
      ]
    })
  ]
})
export class TasksModule {
}
