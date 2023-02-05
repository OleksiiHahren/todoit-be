import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { FavoriteDto } from '@root/modules/favorites/dto/favorite.dto';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { FavoriteEntity } from '@root/data-access/entities/favorites.entity';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@root/guards/jwt.guard';
import { CurrentUser } from '@root/decorators/get-user.decorator';
import { FavoriteTypesEnum } from '@root/data-access/models-enums/favorite-types.enum';
import { PrioritiesEnum } from '@root/data-access/models-enums/priorities.enum';

@Resolver(() => FavoriteDto)
export class FavoriteService {
  readonly logger = new Logger(this.constructor.name);

  constructor(@InjectQueryService(FavoriteEntity) private favoriteQueryService: QueryService<FavoriteDto>) {
  }


  @Query(() => [FavoriteDto])
  @UseGuards(GqlAuthGuard)
  async getUserFavorites(@CurrentUser() user): Promise<FavoriteDto[]> {
    return this.favoriteQueryService.query({});
  }

  @Mutation(() => FavoriteDto)
  @UseGuards(GqlAuthGuard)
  async createNewFavorite(
    @CurrentUser() user,
    favoritePayload: { type: FavoriteTypesEnum, id: string, priority?: PrioritiesEnum }): Promise<FavoriteDto> {
    try {
      const checkAmountOfFavorite = await this.favoriteQueryService.count({
        ownerId: { eq: user.id }
      });

      if (checkAmountOfFavorite === 5) {
        throw new Error(
          'All favorite slots are filled, delete someone before create new'
        );
      }
      const item = new FavoriteDto();
      item.owner = user;
      item.type = favoritePayload.type;
      if (favoritePayload?.priority) {
        item.priority = favoritePayload.priority;
        return this.favoriteQueryService.createOne(item);
      } else {
        const newItem = await this.favoriteQueryService.createOne(item);
        const { priority, ...data } = favoritePayload;
        return await this.setCorrectRelationForItem(newItem.id, data);
      }
    } catch (e) {
      this.logger.error(e);
    }
  }

  private async setCorrectRelationForItem(
    favoriteId,
    data: { type: FavoriteTypesEnum; id: string }
  ): Promise<FavoriteDto> {
    try {
      if (data.type === FavoriteTypesEnum.project) {
        return this.favoriteQueryService.setRelation(
          'project',
          favoriteId,
          data.id
        );
      } else if (data.type === FavoriteTypesEnum.marks) {
        return this.favoriteQueryService.setRelation(
          'mark',
          favoriteId,
          data.id,
        );
      }
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
