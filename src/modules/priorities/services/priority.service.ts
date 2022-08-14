import { Resolver } from '@nestjs/graphql';
import { PriorityDto } from '@root/modules/priorities/dto/priority.dto';


@Resolver(() => PriorityDto)
export class PriorityService {

}
