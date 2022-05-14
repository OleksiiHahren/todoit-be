import { Module } from '@nestjs/common';
import { UserResolver } from '@root/modules/common/user/resolvers/user.resolver';
import { UserService } from '@root/modules/common/user/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@root/data-access/repositories/user.ropository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserResolver, UserService],
})
export class UserModule {
}
