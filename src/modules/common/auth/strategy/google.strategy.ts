import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@root/modules/common/config/config.service';

const config = new ConfigService();

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        process.env.GOOGLE_AUTH_CLIENT_ID ||
        config.get('googleAuth.GOOGLE_AUTH_CLIENT_ID'),
      clientSecret:
        process.env.GOOGLE_AUTH_SECRET ||
        config.get('googleAuth.GOOGLE_AUTH_SECRET'),
      callbackURL:
        process.env.GOOGLE_REDIRECT_URL ||
        config.get('googleAuth.GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile'],

    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
