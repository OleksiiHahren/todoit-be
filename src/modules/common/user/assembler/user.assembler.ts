import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { UserType } from '@root/modules/common/user/types/user.type';
import { UserEntity } from '@root/data-access/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Assembler(UserType, UserEntity)
export class UserAssembler extends ClassTransformerAssembler<
  UserType,
  UserEntity> {
  convertToDTO(entity): UserType {
    return super.convertToDTO(entity);
  }

  convertToCreateEntity(dto: UserType): UserEntity {
    const salt = bcrypt.genSaltSync();
    const user = Object.assign(new UserEntity(), dto);
    user.salt = salt;
    return user;
  }

}