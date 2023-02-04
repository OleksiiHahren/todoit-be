import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';
import { TaskEntity } from '@root/data-access/entities/task.entity';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { FavoriteEntity } from '@root/data-access/entities/favorites.entity';

@Entity()
@Unique(['name', 'id'])
export class MarkEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @OneToOne(() => FavoriteEntity, (fav) => fav.mark, { nullable: true, onDelete: 'CASCADE' })
  favorite: FavoriteEntity;

  @ManyToMany(() => TaskEntity, (tasks) => tasks.marks)
  tasks: TaskEntity[];

  @ManyToOne(() => UserEntity, (user) => user.marks,
    { nullable: false })
  creator: UserEntity;
}
