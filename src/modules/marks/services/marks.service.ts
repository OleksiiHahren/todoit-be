import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MarkDto } from '@root/modules/marks/dto/marks.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@root/guards/jwt.guard';
import { CurrentUser } from '@root/decorators/get-user.decorator';
import { PaginationDto } from '@root/modules/common/dto/pagination.dto';
import { Filter, InjectQueryService, QueryService } from '@nestjs-query/core';
import { MarkEntity } from '@root/data-access/entities/mark.entity';


@Resolver(() => MarkDto)
export class MarkService {
  constructor(@InjectQueryService(MarkEntity) private markEntityService: QueryService<MarkDto>) {
  }


  @Query(() => [MarkDto])
  @UseGuards(GqlAuthGuard)
  async getOwnMarks(
    @CurrentUser() user,
    @Args('paging') paging: PaginationDto
  ): Promise<MarkDto[]> {
    return await this.markEntityService.query({
      paging,
      filter: {
        creator: { id: { eq: user.id } },
      }
    });
  }

  @Query(() => [MarkDto])
  @UseGuards(GqlAuthGuard)
  async getFavoriteMarks(
    @CurrentUser() user,
    @Args('paging') paging: PaginationDto
  ): Promise<MarkDto[]> {
    const filter: Filter<MarkDto> = {
      and: [
        {
          creator: { id: { eq: user.id } }
        },
        {
          favorite: { is: true }
        }
      ]
    };

    return await this.markEntityService.query({ paging, filter });
  }

  @Mutation(() => MarkDto)
  @UseGuards(GqlAuthGuard)
  async deleteMyMark(id: string, @CurrentUser() user): Promise<MarkDto> {
    return await this.markEntityService.deleteOne(id, {
      filter: { creator: { id: { eq: user.id } } }
    });
  }

  @Mutation(() => MarkDto)
  @UseGuards(GqlAuthGuard)
  async removeFromFavoriteMark(
    id: string,
    @CurrentUser() user
  ): Promise<MarkDto> {
    const targetMark = await this.markEntityService.getById(id, { filter: { creator: { id: { eq: user.id } } } });
    return await this.markEntityService.updateOne(targetMark.id, targetMark);
  }
}
