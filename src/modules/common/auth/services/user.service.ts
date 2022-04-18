import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@root/data-access/repositories/user.ropository';
import { UserCreatDto } from '@root/modules/common/auth/dto/user-creat.dto';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { UserCreateInterface } from '@root/modules/common/auth/interfaces/user-create.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {}

  async create(userData: UserCreatDto): Promise<UserEntity>;
  async create(userData: UserCreateInterface): Promise<UserEntity> {
    if (!userData?.password) {
      userData.password = this.genRandomPassword();
    }
    const user = await this.userRepo.createUser(userData);
    return user
  }
  update() {}

  delete() {}

  private genRandomPassword() {
    return (Math.random() + 10).toString(32).substring(2);
  }
}
