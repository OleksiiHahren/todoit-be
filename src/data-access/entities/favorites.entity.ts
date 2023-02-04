import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { MarkEntity } from '@root/data-access/entities/mark.entity';
import { PrioritiesEnum } from '@root/data-access/models-enums/priorities.enum';

@Entity()
@Unique(['id'])
export class FavoriteEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'priority' | 'project' | 'tag';

  @Column({ nullable: true, enum: PrioritiesEnum })
  priority: PrioritiesEnum;

  @ManyToOne(() => UserEntity, (user) => user.favorite,
    { nullable: false })
  owner: UserEntity;

  @OneToOne(() => ProjectEntity, (project) => project.favorite, { nullable: true })
  project: ProjectEntity;

  @OneToOne(() => MarkEntity, (mark) => mark.favorite, { nullable: true })
  mark: MarkEntity;
}
