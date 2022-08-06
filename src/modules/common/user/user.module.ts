import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { UserType } from '@root/modules/common/user/types/user.type';
import { UserAssembler } from '@root/modules/common/user/assembler/user.assembler';
import { UserService } from '@root/modules/common/user/services/user.service';


@Module({
  providers: [UserService],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
      assemblers: [UserAssembler],
      resolvers: [
        {
          DTOClass: UserType,
          EntityClass: UserEntity,
        },
      ],
    }),
  ],
})
export class UserModule {}
