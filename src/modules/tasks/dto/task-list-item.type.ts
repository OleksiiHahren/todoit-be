import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  BeforeUpdateOne,
  FilterableField, OffsetConnection,
  Relation
} from '@nestjs-query/query-graphql';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { IsOptional } from 'class-validator';
import { MarkDto } from '@root/modules/marks/dto/marks.dto';
import { UserDto } from '@root/modules/common/user/dto/user.dto';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { ProjectDto } from '@root/modules/projects/dto/project.dto';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { MarkEntity } from '@root/data-access/entities/mark.entity';
import { CreateTaskRelationsHook } from '@root/modules/tasks/services/task-fill-data-hook.service';
import { UpdateTaskRelationsHook } from '@root/modules/tasks/services/task-update-data-hook.service';
import { ReminderDto } from '@root/modules/reminder/services/dto/reminder.dto';
import { RemindersEntity } from '@root/data-access/entities/reminders.entity';
import { PrioritiesEnum } from '@root/data-access/models-enums/priorities.enum';

@ObjectType('task')
@BeforeCreateOne(CreateTaskRelationsHook)
@BeforeUpdateOne(UpdateTaskRelationsHook)

@Relation('creator', () => UserDto, { disableRemove: false, nullable: false })
@Relation('reminder', () => ReminderDto, { disableRemove: false, nullable: true })
@Relation('project', () => ProjectDto, { disableRemove: false, nullable: true })
@OffsetConnection('marks', () => MarkDto, { disableRemove: false, nullable: true })
export class TaskDto {
  @Field(() => ID)
  id: string;

  @FilterableField({ nullable: false })
  name: string;

  @FilterableField({ nullable: true })
  description: string;

  @FilterableField({ nullable: true })
  deadline: Date;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  markIds?: number[];

  @FilterableField(() => ID, { nullable: true })
  projectId!: string;

  @FilterableField({ defaultValue: PrioritiesEnum.low })
  priority: PrioritiesEnum;

  @Field()
  @IsOptional()
  reminderTime?: Date;

  @Field({ defaultValue: false })
  @IsOptional()
  repeatReminder: boolean;

  @FilterableField({ nullable: true, defaultValue: StatusesEnum.relevant })
  status: StatusesEnum;

  @FilterableField()
  updatedAt: Date;

  @FilterableField()
  createdAt: Date;

  creator?: UserEntity;

  project?: ProjectEntity;

  marks?: MarkEntity[];

  reminder?: RemindersEntity;
}
