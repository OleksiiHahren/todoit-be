import { ID, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('priority')
export class MarkDto {
  @FilterableField(type => ID)
  id: string;

  @FilterableField()
  name: string;

  @FilterableField()
  color: string;

}
