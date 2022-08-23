import { Resolver } from '@nestjs/graphql';
import { MarkDto } from '@root/modules/marks/dto/marks.dto';


@Resolver(() => MarkDto)
export class MarkService {

}
