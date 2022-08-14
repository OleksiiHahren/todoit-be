import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { PriorityEntity } from '@root/data-access/entities/priority.entity';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { ReminderEntity } from '@root/data-access/entities/reminder.entity';

@Entity()
@Unique(['name', 'id'])
export class TaskEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => ProjectEntity, (project) => project.tasks,
    { nullable: true })
  project: ProjectEntity;

  @Column({ nullable: true })
  deadLine: Date;

  @ManyToOne(() => PriorityEntity, (priority) => priority.tasks,
    { nullable: true })
  priority: PriorityEntity;

  @OneToOne(() => ReminderEntity, (reminder) => reminder.task,
    { nullable: true })
  remind: ReminderEntity;

  @Column({ default: StatusesEnum.relevant })
  status: StatusesEnum;
}
