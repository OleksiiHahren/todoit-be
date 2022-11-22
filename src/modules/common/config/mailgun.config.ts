import { ConfigService } from '@root/modules/common/config/config.service';

const config = new ConfigService();
export default {
  username:
    process.env.MAILGUN_USERNAME || config.get('mailgun.MAILGUN_USERNAME'),
  key: process.env.MAILGUN_KEY || config.get('mailgun.MAILGUN_KEY'),
  public_key:
    process.env.MAILGUN_PUBLIC_KEY || config.get('mailgun.MAILGUN_PUBLIC_KEY'),
  host: process.env.MAILGUN_HOST || config.get('mailgun.MAILGUN_HOST'),
  password:
    process.env.MAILGUN_PASSWORD || config.get('mailgun.MAILGUN_PASSWORD'),
};
