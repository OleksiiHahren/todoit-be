import { Unique, BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from '@root/data-access/entities/task.entity';

@Entity()
@Unique(['name', 'id'])
export class ProjectEntity extends BaseEntity {

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
