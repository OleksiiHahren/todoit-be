import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { UserEntity } from '@root/data-access/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserDto } from '@root/modules/common/user/dto/user.dto';
import { UserCreationDto } from '@root/modules/common/user/dto/user-creation.dto';

@Assembler(UserDto, UserEntity)
export class UserAssembler extends ClassTransformerAssembler<
  UserDto,
  UserEntity> {
  convertToDTO(entity): UserDto {
    return super.convertToDTO(entity);
  }

  convertToCreateEntity(dto: UserCreationDto): UserEntity {
    const salt = bcrypt.genSaltSync();
    const user = Object.assign(new UserEntity(dto.password), dto);
    user.salt = salt;
    return user;
  }

}
