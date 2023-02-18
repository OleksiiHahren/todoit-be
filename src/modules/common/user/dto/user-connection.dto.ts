import { ArgsType } from '@nestjs/graphql';
import { QueryArgsType } from '@nestjs-query/query-graphql';
import { UserDto } from '@root/modules/common/user/dto/user.dto';


@ArgsType()
export class UserQuery extends QueryArgsType(UserDto) {}
export const UserConnection = UserQuery.ConnectionType;
