import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Unique } from 'typeorm/browser';
import { TaskEntity } from '@root/data-access/entities/task.entity';

@Entity()
export class ProjectEntity extends BaseEntity {
  @Unique(['name', 'id'])

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  favorite: boolean;

  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks: TaskEntity[];

}
