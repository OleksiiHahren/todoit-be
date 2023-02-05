import { Module } from '@nestjs/common';
import { FavoriteService } from '@root/modules/favorites/services/favorite.service';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { CommonModule } from '@root/modules/common/common.module';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { GqlAuthGuard } from '@root/guards/jwt.guard';
import { FavoriteEntity } from '@root/data-access/entities/favorites.entity';
import { FavoriteDto } from '@root/modules/favorites/dto/favorite.dto';

@Module({
  providers: [FavoriteService],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        CommonModule,
        NestjsQueryTypeOrmModule.forFeature([
          FavoriteEntity
        ])
      ],
      resolvers: [
        {
          guards: [GqlAuthGuard],
          create: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          update: { disabled: true },
          DTOClass: FavoriteDto,
          EntityClass: FavoriteEntity
        }
      ]
    })
  ]
})
export class FavoritesModule {
}
