import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@root/data-access/repositories/user.ropository';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { UserCreateInterface } from '@root/modules/common/auth/interfaces/user-create.interface';
import { UserInputType } from '@root/modules/common/user/types/user-input.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository
  ) {
  }

  async create(userData: UserInputType): Promise<UserEntity>;
  async create(userData: UserCreateInterface): Promise<UserEntity> {
    if (!userData?.password) {
      userData.password = this.genRandomPassword();
    }
    return await this.userRepo.createUser(userData);
  }

  async update(userData: UserInputType) {
    const existUser = await this.userRepo.findByEmail(userData.email);
    if (!existUser) {
      return new InternalServerErrorException('User not exists!');
    }
    const updatedValues = Object.assign(existUser, userData);
    await updatedValues.hashPassword(userData.password);
    return this.userRepo.save({ id: existUser.id, ...updatedValues });
  }

  async getById(id: number): Promise<UserEntity> {
    return await this.userRepo.findById(id);
  }

  private genRandomPassword() {
    return (Math.random() + 10).toString(32).substring(2);
  }
}
