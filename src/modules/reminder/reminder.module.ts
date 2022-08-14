import { Module } from '@nestjs/common';
import { ReminderService } from '@root/modules/reminder/services/reminder.service';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { CommonModule } from '@root/modules/common/common.module';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { GqlAuthGuard } from '@root/guards/jwt.guard';
import { ReminderEntity } from '@root/data-access/entities/reminder.entity';
import { ReminderDto } from '@root/modules/reminder/dto/reminder.dto';

@Module({
  providers: [ReminderService],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        CommonModule,
        NestjsQueryTypeOrmModule.forFeature([ReminderEntity]),
      ],
      assemblers: [],
      resolvers: [
        {
          create: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          update: { many: { disabled: true } },
          DTOClass: ReminderDto,
          EntityClass: ReminderEntity,
          guards: [GqlAuthGuard],
        },
      ],
    }),
  ]
})
export class ReminderModule {}
