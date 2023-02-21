import {
  BaseEntity,
  Column, CreateDateColumn,
  Entity,
  JoinColumn, JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique, UpdateDateColumn
} from 'typeorm';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { MarkEntity } from '@root/data-access/entities/mark.entity';
import { RemindersEntity } from '@root/data-access/entities/reminders.entity';
import { PrioritiesEnum } from '@root/data-access/models-enums/priorities.enum';
import { IsEnum } from 'class-validator';

@Entity()
@Unique(['name', 'id'])
export class TaskEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => ProjectEntity, (project) => project.tasks,
    { nullable: true, cascade: true })
  project: ProjectEntity;

  @Column({ nullable: true })
  deadline: Date;

  @Column({ enum: PrioritiesEnum, default: PrioritiesEnum.low })
  @IsEnum(PrioritiesEnum)
  priority: PrioritiesEnum;

  @ManyToMany(() => MarkEntity, (mark) => mark.tasks,
    { nullable: true, cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  marks: MarkEntity;

  @OneToOne(() => RemindersEntity, (remind) => remind.task, { nullable: true, onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  reminder: RemindersEntity;

  @Column({ default: StatusesEnum.relevant })
  status: StatusesEnum;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { nullable: false })
  creator: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
