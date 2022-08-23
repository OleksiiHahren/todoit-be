import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { DeepPartial } from '@nestjs-query/core/dist/src/common';
import { UserInputDto } from '@root/modules/common/user/dto/user-input.dto';

@Assembler(UserInputDto, UserEntity)
export class UserInputAssembler extends ClassTransformerAssembler<
  UserInputDto,
  UserEntity
> {
  convertToUpdateEntity(dto: UserInputDto): DeepPartial<UserEntity> {
    const user = super.convertToUpdateEntity(dto);
    return user;
  }
}
