import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class RefreshToken extends BaseEntity {
  @Unique(['userId'])

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  isRevoked: boolean;

  @Column()
  expires: Date;
}
