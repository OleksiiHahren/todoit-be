import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from '@root/data-access/entities/task.entity';

@Entity()
export class ReminderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timeForRemind: Date;

  @Column()
  repeatInterval: string;

  @OneToOne(() => TaskEntity, (task) => task.remind)
  task: TaskEntity;

}
