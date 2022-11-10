import { Module, Scope } from '@nestjs/common';
import { MailgunModule } from 'nestjs-mailgun';
import { SenderService } from '@root/modules/email-sending/services/sender.service';
import mailgunConfig from '@root/modules/common/config/mailgun.config';
import * as moment from 'moment';

@Module({
  imports: [
    MailgunModule.forRoot(mailgunConfig),
  ],
  providers: [
    SenderService,
    {
      provide: 'MomentWrapper',
      useFactory: async () => moment(),
      scope: Scope.REQUEST,
    },
  ],
})
export class EmailSendingModule {}
