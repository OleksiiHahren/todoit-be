/*
import {
  FilterableField,
  UpdateOneInputType
} from '@nestjs-query/query-graphql';
import { ID, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { ProjectDto } from '@root/modules/projects/dto/project.dto';

@InputType('projectInput')
export class ProjectInputDto {

  @FilterableField()
  name: string;

  @FilterableField()
  @IsOptional()
  color: string;

  @FilterableField(() => ID, { nullable: true })
  @IsOptional()
  creatorId: string;

  creator?: UserEntity;
}

@InputType()
export class UpdateOneTaskItemInput extends UpdateOneInputType(
  ProjectDto,
  ProjectInputDto
) {
}
*/
