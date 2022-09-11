import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { MarkEntity } from '@root/data-access/entities/priority.entity';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { ReminderEntity } from '@root/data-access/entities/reminder.entity';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { JoinColumn, JoinTable } from 'typeorm/browser';

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
  deadline: Date;

  @ManyToOne(() => MarkEntity, (mark) => mark.tasks,
    { nullable: true })
  marks: MarkEntity;

  @OneToOne(() => ReminderEntity, (reminder) => reminder.task,
    { nullable: true })
  remind: ReminderEntity;

  @Column({ default: StatusesEnum.relevant })
  status: StatusesEnum;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { nullable: false })
  creator: UserEntity;
}
