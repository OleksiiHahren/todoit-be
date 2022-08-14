import { ID, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { IsDate, IsEnum } from 'class-validator';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';

@ObjectType('reminder')
export class ReminderDto {
  @FilterableField(type => ID)
  id: string;

  @FilterableField()
  repeatInterval: string;

  @FilterableField()
  @IsDate()
  timeForRemind: Date;

  @FilterableField()
  @IsEnum(StatusesEnum)
  status: StatusesEnum;
}
