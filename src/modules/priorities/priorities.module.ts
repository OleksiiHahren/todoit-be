import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { GqlAuthGuard } from '@root/guards/jwt.guard';
import { CommonModule } from '@root/modules/common/common.module';
import { PriorityEntity } from '@root/data-access/entities/priority.entity';
import { PriorityDto } from '@root/modules/priorities/dto/priority.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        CommonModule,
        NestjsQueryTypeOrmModule.forFeature([PriorityEntity]),
      ],
      assemblers: [],
      resolvers: [
        {
          create: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          update: { many: { disabled: true } },
          DTOClass: PriorityDto,
          EntityClass: PriorityEntity,
          guards: [GqlAuthGuard],
        },
      ],
    }),
  ]
})
export class PrioritiesModule {}
