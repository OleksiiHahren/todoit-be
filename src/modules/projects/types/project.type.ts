import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Project')
export class ProjectDto {
  @FilterableField(type => ID)
  id: string;

  @FilterableField()
  name: string;

  @FilterableField()
  color: string;

  @FilterableField()
  favorite: boolean;

}
