import { Module } from '@nestjs/common';
import { ConfigService } from '@root/modules/common/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql/error';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
      formatError: (error: GraphQLError) => {
        const message =
          error?.message || (error?.extensions?.message as string);
        const { exception } = error?.extensions;

        const graphQLFormattedError: GraphQLFormattedError = {
          message,
          extensions: { status: exception ? exception['status'] : ''}, // TODO figure out later why this shit not consist status field
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
