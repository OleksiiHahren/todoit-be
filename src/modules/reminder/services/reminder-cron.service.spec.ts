import { Test, TestingModule } from '@nestjs/testing';
import { ReminderCronService } from './reminder-cron.service';

describe('ReminderCronService', () => {
  let service: ReminderCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReminderCronService],
    }).compile();

    service = module.get<ReminderCronService>(ReminderCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
