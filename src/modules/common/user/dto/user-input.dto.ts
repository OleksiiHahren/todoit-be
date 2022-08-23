import { InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { FilterableField } from '@nestjs-query/query-graphql';

@InputType('UserInputDto')
export class UserInputDto {
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
