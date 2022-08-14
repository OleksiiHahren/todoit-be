import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { FilterableField } from '@nestjs-query/query-graphql';

@InputType('UserInputType')
export class UserInputType {
  @FilterableField()
  id: number;

  @FilterableField()
  firstName: string;

  @FilterableField()
  lastName: string;

  @FilterableField()
  @IsEmail()
  email: string;
}
