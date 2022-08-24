import { Module } from '@nestjs/common';
import { ConfigService } from '@root/modules/common/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql/error';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
      formatError: (error: GraphQLError) => {
        const message =
          error?.message || (error?.extensions?.message as string);
        const status = error?.extensions.exception['status'] as string;
        const graphQLFormattedError: GraphQLFormattedError = {
          message,
          extensions: { status }
        };
        return graphQLFormattedError;
      },
      context: ({ req }) => ({ req })
    })
  ],
  providers: [ConfigService]
})
export class ConfigModule {
}
