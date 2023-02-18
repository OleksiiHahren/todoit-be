import { Module } from '@nestjs/common';
import { SearchService } from '@root/modules/global-search/services/search.service';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { MarkEntity } from '@root/data-access/entities/mark.entity';
import { TaskEntity } from '@root/data-access/entities/task.entity';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { CommonModule } from '@root/modules/common/common.module';

@Module({
  imports:[
    CommonModule,
    NestjsQueryTypeOrmModule.forFeature([
      MarkEntity,
      TaskEntity,
      ProjectEntity,
    ]),
  ],
  providers:[SearchService]
})
export class GlobalSearchModule {}
