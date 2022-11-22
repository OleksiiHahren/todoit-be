import { Module, Scope } from '@nestjs/common';
import { SenderService } from '@root/modules/email-sending/services/sender.service';
import mailgunConfig from '@root/modules/common/config/mailgun.config';
import * as moment from 'moment';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { CommonModule } from '@root/modules/common/common.module';

@Module({
  imports: [
    CommonModule,
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: mailgunConfig.host,
          secure: true,
          auth: {
            user: mailgunConfig.username,
            pass: mailgunConfig.password,
          },
        },
        defaults: {
          from: `"No Reply" <${mailgunConfig.username}>`,
        },
        template: {
          dir: './src/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [
    SenderService,
    {
      provide: 'MomentWrapper',
      useFactory: async () => moment(),
      scope: Scope.REQUEST,
    },
  ],
  exports: [
    SenderService
  ]
})
export class  EmailSendingModule {}
