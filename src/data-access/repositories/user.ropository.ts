import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@root/data-access/entities/user.entity';
import {
  PaginationRequest,
  RegularRepositoryInterface,
} from '@root/data-access/interfaces/regular-repository.interface';
import { UserCreateInterface } from '@root/modules/common/auth/interfaces/user-create.interface';
import { UserCreatDto } from '@root/modules/common/auth/dto/user-creat.dto';

@EntityRepository(UserEntity)
export class UserRepository
  extends Repository<UserEntity>
  implements RegularRepositoryInterface<UserEntity>
{
  async getById(id: number): Promise<UserEntity> {
    return await this.findOne({ id });
  }

  async getMany(pagination: PaginationRequest): Promise<UserEntity[]> {
    return await this.find({ skip: pagination.skip, take: pagination.take });
  }

  async findByEmail(email: string) {
    return await this.findOne({ email });
  }

  async findById(id: number) {
    return await this.findById(id);
  }

  async createUser(userData: UserCreateInterface): Promise<UserEntity>;
  async createUser(userData: UserCreatDto): Promise<UserEntity> {
    const userEntity = await this.receivedDataToEntity(userData);
    return this.create(userEntity);
  }

  private async receivedDataToEntity(
    data: UserCreateInterface,
  ): Promise<UserEntity>;
  private async receivedDataToEntity(data: UserCreatDto): Promise<UserEntity> {
    const resData = new UserEntity();
    await resData.createSalt();
    await resData.hashPassword(data.password);
    resData.firsName = data.firstName;
    resData.lastName = data.lastName;
    resData.email = data.email;
    return resData
  }
}
