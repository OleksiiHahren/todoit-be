import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { TaskEntity } from '@root/data-access/entities/task.entity';

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

  @ManyToMany(() => TaskEntity, (tasks) => tasks.marks)
  tasks: TaskEntity[];

}
