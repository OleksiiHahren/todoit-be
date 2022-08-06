import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { UserInputType } from '@root/modules/common/user/types/user-input.type';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { DeepPartial } from '@nestjs-query/core/dist/src/common';

@Assembler(UserInputType, UserEntity)
export class UserInputAssembler extends ClassTransformerAssembler<
  UserInputType,
  UserEntity
> {
  convertToUpdateEntity(dto: UserInputType): DeepPartial<UserEntity> {
    const user = super.convertToUpdateEntity(dto);
    return user;
  }
}
