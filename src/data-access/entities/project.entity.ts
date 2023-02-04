import {
  Unique,
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { TaskEntity } from '@root/data-access/entities/task.entity';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { FavoriteEntity } from '@root/data-access/entities/favorites.entity';

@Entity()
@Unique(['name', 'id'])
export class ProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @OneToOne(() => FavoriteEntity, (fav) => fav.project, { nullable: true, onDelete: 'CASCADE' })
  favorite: FavoriteEntity;

  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks: TaskEntity[];

  @ManyToOne(() => UserEntity, (user) => user.projects, { nullable: false })
  @JoinColumn()
  creator: UserEntity;
}
