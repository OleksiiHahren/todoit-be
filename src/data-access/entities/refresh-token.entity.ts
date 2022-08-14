import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['userId'])
export class RefreshToken extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  isRevoked: boolean;

  @Column()
  expires: Date;
}
