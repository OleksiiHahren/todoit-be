import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@root/data-access/entities/user.entity';
import {
  PaginationRequest,
  RegularRepositoryInterface,
} from '@root/data-access/interfaces/regular-repository.interface';

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
}
