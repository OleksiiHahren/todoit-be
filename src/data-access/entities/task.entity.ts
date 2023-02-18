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

@Entity()
@Unique(['name', 'id'])
export class TaskEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  order: number;

  @ManyToOne(() => ProjectEntity, (project) => project.tasks,
    { nullable: true, cascade: true })
  project: ProjectEntity;

  @Column({ nullable: true })
  deadline: Date;

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
