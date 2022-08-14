import { Resolver } from '@nestjs/graphql';
import { ReminderDto } from '@root/modules/reminder/dto/reminder.dto';

@Resolver(() => ReminderDto)
export class ReminderService {}
