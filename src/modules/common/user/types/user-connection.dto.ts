import { ArgsType } from '@nestjs/graphql';
import { QueryArgsType } from '@nestjs-query/query-graphql';
import { UserType } from '@root/modules/common/user/types/user.type';


@ArgsType()
export class UserQuery extends QueryArgsType(UserType) {}
export const UserConnection = UserQuery.ConnectionType;
