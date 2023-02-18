import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType('searched')
export class SearchResultDto {
  constructor(id, name, type, color) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.color = color;
  }

  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  type: 'task' | 'project' | 'mark';

  @Field({ nullable: true, defaultValue: null })
  color: string;
}
