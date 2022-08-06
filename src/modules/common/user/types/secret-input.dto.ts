import { Field, InputType } from '@nestjs/graphql';

@InputType('SecretInput')
export class SecretInputDto {

  @Field()
  title: string;

  @Field()
  completed: boolean;

}
