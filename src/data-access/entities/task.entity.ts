import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { MarkEntity } from '@root/data-access/entities/mark.entity';

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
    { nullable: true })
  project: ProjectEntity;

  @Column({ nullable: true })
  deadline: Date;

  @ManyToOne(() => MarkEntity, (mark) => mark.tasks,
    { nullable: true })
  marks: MarkEntity;

  @Column({ nullable: true })
  remind: Date;

  @Column({ default: false })
  repeatRemind: boolean;

  @Column({ default: StatusesEnum.relevant })
  status: StatusesEnum;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { nullable: false })
  creator: UserEntity;
}
