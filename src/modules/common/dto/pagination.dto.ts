import { ID, InputType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';


@InputType('Paging')
export class PaginationDto {
  @FilterableField()
  limit: number;

  @FilterableField()
  offset: number;
}
