import { Field, InputType } from '@nestjs/graphql';

@InputType('ChangePassword')
export class ChangePasswordDto {
  @Field()
  oldPass: string;

  @Field()
  newPass: string;
}
