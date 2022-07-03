import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { PriorityEntity } from '@root/data-access/entities/priority.entity';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { ReminderEntity } from '@root/data-access/entities/reminder.entity';

@Entity()
export class TaskEntity extends BaseEntity {
  @Unique(['name', 'id'])

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => ProjectEntity, (project) => project.tasks)
  project: ProjectEntity;

  @Column({ nullable: true })
  deadLine: Date;

  @ManyToOne(() => PriorityEntity, (priority) => priority.tasks)
  priority: PriorityEntity;

  @OneToOne(() => ReminderEntity, (reminder) => reminder.task)
  remind: ReminderEntity;

  @Column({ default: StatusesEnum.relevant })
  status: StatusesEnum;
}
