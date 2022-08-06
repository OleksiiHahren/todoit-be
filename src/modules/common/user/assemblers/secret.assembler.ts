import {
  Assembler,
  ClassTransformerAssembler
} from '@nestjs-query/core';
import { UserType } from '@root/modules/common/user/types/user.type';
import { UserEntity } from '@root/data-access/entities/user.entity';

@Assembler(
  UserType,
  UserEntity
)
export class UserAssembler extends ClassTransformerAssembler<UserType,
  UserEntity> {
  convertToDTO(entity: UserEntity): UserType {
    return super.convertToDTO(entity);
  }
  convertToEntity(dto: UserType): UserEntity {
    return super.convertToEntity(dto);
  }
}


