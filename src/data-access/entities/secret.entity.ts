import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity('secret')
export class SecretEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  completed: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
