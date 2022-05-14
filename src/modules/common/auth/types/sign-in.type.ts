import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class SignInType {

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsEmail()
  password: string;
}
