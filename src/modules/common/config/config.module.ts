import { Module } from '@nestjs/common';
import { ConfigService } from '@root/modules/common/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({ autoSchemaFile: true, driver: ApolloDriver }),
  ],
  providers: [ConfigService],
})
export class ConfigModule {}
