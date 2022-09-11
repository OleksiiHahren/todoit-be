import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { FilterableField } from '@nestjs-query/query-graphql';

import * as bcrypt from 'bcryptjs';
import { genSaltSync } from 'bcryptjs';
import { TaskEntity } from '@root/data-access/entities/task.entity';
import { ProjectEntity } from '@root/data-access/entities/project.entity';
import { MarkEntity } from '@root/data-access/entities/priority.entity';

@Entity()
@Unique(['email', 'id'])
export class UserEntity extends BaseEntity {
  constructor(password) {
    super();
    this.salt = genSaltSync();
    this.password = bcrypt.hashSync(password || '', this.salt);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @FilterableField()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  salt: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @OneToMany(() => TaskEntity, (tasks) => tasks.creator, { nullable: true, cascade: true })
  tasks: TaskEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.creator,
    { nullable: true, cascade: true })
  projects: ProjectEntity[];

  @OneToMany(() => MarkEntity, (mark) => mark.creator,
    { nullable: true, cascade: true })
  marks: MarkEntity[];


  async createSalt() {
    this.salt = await bcrypt.genSalt();
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.salt);
  }

  async hashPassword(password: string) {
    this.password = await bcrypt.hash(password, this.salt);
  }
}
