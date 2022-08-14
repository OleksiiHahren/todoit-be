import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { UserType } from '@root/modules/common/user/types/user.type';
import { UserAssembler } from '@root/modules/common/user/assembler/user.assembler';
import { UserService } from '@root/modules/common/user/services/user.service';
import { AuthModule } from '@root/modules/common/auth/auth.module';
import { GqlAuthGuard } from '@root/guards/jwt.guard';


@Module({
  providers: [UserService],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        AuthModule,
        NestjsQueryTypeOrmModule.forFeature([UserEntity])],
      assemblers: [UserAssembler],
      resolvers: [
        {
          create: { disabled: true },
          delete: { disabled: true },
          update: { many: { disabled: true } },
          read: { many: { disabled: true } },
          DTOClass: UserType,
          EntityClass: UserEntity
        }
      ],
    }),
  ],
})
export class UserModule {}
