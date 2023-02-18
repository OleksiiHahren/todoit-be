import { ID, InputType, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { IsEmail } from 'class-validator';

@InputType('UserCreation')
export class UserCreationDto {

  @FilterableField()
  firstName: string;

  @FilterableField()
  lastName: string;

  @FilterableField()
  @IsEmail()
  email: string;

  @FilterableField()
  password: string;
}
