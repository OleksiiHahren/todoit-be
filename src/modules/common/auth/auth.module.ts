import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { GoogleStrategy } from '@root/modules/common/auth/strategy/google.strategy';
import { AuthController } from '@root/modules/common/auth/controllers/auth.controller';
import { AuthService } from '@root/modules/common/auth/services/auth.service';
import { TokenService } from '@root/modules/common/auth/services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from '@root/modules/common/auth/resolvers/auth.resolver';
import * as config from 'config';
import { PassportModule } from '@nestjs/passport';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { RefreshToken } from '@root/data-access/entities/refresh-token.entity';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { TokensType } from '@root/modules/common/auth/types/tokens.type';
import { UserType } from '@root/modules/common/user/types/user.type';
import { UserInputType } from '@root/modules/common/user/types/user-input.type';
import { UserAssembler } from '@root/modules/common/user/assembler/user.assembler';
import { UserService } from '@root/modules/common/user/services/user.service';

const jwtConfig = config.get('jwt');

/*@Module({
  providers: [UserService],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
      assemblers: [UserAssembler],
      resolvers: [
        {
          create: { disabled: true },
          delete: { disabled: true },
          update: { many: { disabled: true } },
          DTOClass: UserType,
          EntityClass: UserEntity
        }
      ]
    })
  ]
})*/
@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret
    }),
    PassportModule.register({ defaultStrategy: 'google' }),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([UserEntity, RefreshToken])],
      assemblers: [UserAssembler],
      resolvers: [
        {
          DTOClass: TokensType,
          EntityClass: RefreshToken,
          create: { disabled: true },
          delete: { disabled: true },
          update: { disabled: true },
          read: { many: { disabled: true } }
        }]
    }),
  ],
  providers: [GoogleStrategy, AuthService, AuthResolver, TokenService],
  exports: [TokenService],
})
export class AuthModule {}
