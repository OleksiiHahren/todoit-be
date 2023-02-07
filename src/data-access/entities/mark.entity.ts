import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';
import { TaskEntity } from '@root/data-access/entities/task.entity';
import { UserEntity } from '@root/data-access/entities/user.entity';

@Entity()
@Unique(['name', 'id'])
export class MarkEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column({ default: false })
  favorite: boolean;

  @ManyToMany(() => TaskEntity, (tasks) => tasks.marks, { onDelete: 'SET NULL' })
  tasks: TaskEntity[];

  @ManyToOne(() => UserEntity, (user) => user.marks,
    { nullable: false })
  creator: UserEntity;
}
