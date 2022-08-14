import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { TaskEntity } from '@root/data-access/entities/task.entity';

@Entity()
@Unique(['name', 'id'])
export class PriorityEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column({ default: false })
  favorite: boolean;

  @OneToMany(() => TaskEntity, (tasks) => tasks.priority)
  tasks: TaskEntity[];

}
