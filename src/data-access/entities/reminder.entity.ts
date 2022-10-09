import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StatusesEnum } from '@root/data-access/models-enums/statuses.enum';
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

  @Column({ default: StatusesEnum.relevant })
  status: StatusesEnum;

}
