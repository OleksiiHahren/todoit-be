import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Task_list_item')
export class TaskListItemType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  deadline: string;

  @Field()
  priority: string;

  @Field()
  project: string;
}
