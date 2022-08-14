import { ID, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('priority')
export class PriorityDto {
  @FilterableField(type => ID)
  id: string;

  @FilterableField()
  name: string;

  @FilterableField()
  color: string;

  @FilterableField()
  favorite: boolean;
}
