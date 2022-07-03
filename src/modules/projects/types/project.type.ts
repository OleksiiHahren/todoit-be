import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, OneToMany } from 'typeorm';
import { TaskEntity } from '@root/data-access/entities/task.entity';

@ObjectType('Project')
export class ProjectType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  color: string;

  @Field()
  favorite: boolean;

}
