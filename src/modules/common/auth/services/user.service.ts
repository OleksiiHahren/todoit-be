import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@root/data-access/repositories/user.ropository';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { UserCreateInterface } from '@root/modules/common/auth/interfaces/user-create.interface';
import { UserType } from '@root/data-access/types/user.type';
import { UserInputType } from '@root/data-access/types/user-input.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {}

  async create(userData: UserInputType): Promise<UserEntity>;
  async create(userData: UserCreateInterface): Promise<UserEntity> {
    if (!userData?.password) {
      userData.password = this.genRandomPassword();
    }
    console.log(userData)
    const user = await this.userRepo.createUser(userData);
    console.log(user)
    return user;
  }
  update() {}

  delete() {}

  async getById(id: number): Promise<UserEntity> {
    return await this.userRepo.findById(id);
  }

  private genRandomPassword() {
    return (Math.random() + 10).toString(32).substring(2);
  }
}
