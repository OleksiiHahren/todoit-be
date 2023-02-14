import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { TaskEntity } from '@root/data-access/entities/task.entity';

@Entity()
@Unique(['id'])
export class RemindersEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz', nullable: true })
  certainTime: Date;

  @Column({ default: false })
  notifyIfOverdue: boolean;

  @OneToOne(() => TaskEntity, (task) => task.reminder)
  task: TaskEntity;
}
