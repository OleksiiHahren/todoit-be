import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class RefreshToken extends BaseEntity {
  @Unique(['userId'])
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  isRevoked: boolean;

  @Column()
  expires: Date;
}
