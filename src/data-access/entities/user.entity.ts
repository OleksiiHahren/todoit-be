import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
@Entity()
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firsName: string;

  @Column()
  lastName: string;

  @Column()
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
