import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { GqlAuthGuard } from '@root/guards/jwt.guard';
import { CommonModule } from '@root/modules/common/common.module';
import { MarkDto } from '@root/modules/marks/dto/marks.dto';
import { MarkEntity } from '@root/data-access/entities/mark.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        CommonModule,
        NestjsQueryTypeOrmModule.forFeature([MarkEntity]),
      ],
      assemblers: [],
      resolvers: [
        {
          create: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          update: { many: { disabled: true } },
          DTOClass: MarkDto,
          EntityClass: MarkEntity,
          guards: [GqlAuthGuard],
        },
      ],
    }),
  ]
})
export class MarkModule {}
