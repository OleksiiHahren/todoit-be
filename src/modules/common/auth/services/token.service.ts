import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepository } from '@root/data-access/repositories/user.ropository';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokensRepository } from '@root/data-access/repositories/refresh-token.repository';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { RefreshToken } from '@root/data-access/entities/refresh-token.entity';
import { JwtService } from '@nestjs/jwt';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';

const BASE_OPTIONS: SignOptions = {
  issuer: 'todoit',
  audience: 'todoit',
};

export interface RefreshTokenPayload {
  jti: number;
  subject: number;
}

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(UserRepository)
    private users: UserRepository,
    @InjectRepository(RefreshTokensRepository)
    private tokens: RefreshTokensRepository,
    private jwt: JwtService,
  ) {}

  public async generateAccessToken(user: UserEntity): Promise<string> {
    const opts: SignOptions = {
      ...BASE_OPTIONS,
      subject: String(user.id),
    };

    return await this.jwt.signAsync(opts, { expiresIn: '1m' });
  }

  public async generateRefreshToken(user: UserEntity): Promise<string> {
    const token = await this.tokens.createRefreshToken(user);

    const opts: SignOptions = {
      ...BASE_OPTIONS,
      subject: String(user.id),
      jwtid: String(token.id),
      expiresIn: '2 days'
    };

    return this.jwt.signAsync(opts, {
      expiresIn: '2 days'
    });
  }

  async validateToken(
    token,
  ): Promise<{ user: UserEntity; valid: RefreshToken }> {
    const valid = await this.jwt.verifyAsync(token, { ignoreExpiration: false });
    const res = { user: null, valid };
    if (valid) {
      res.user = await this.users.findById(valid.subject);
    }
    return res;
  }

  public async resolveRefreshToken(
    encoded: string
  ): Promise<{ user: UserEntity; token: RefreshToken }> {
    const payload = await this.decodeAndCheckRefreshToken(encoded);
    console.log('payload--------', payload);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);
    if (!token) {
      throw new HttpException(
        'Refresh Token does not exist',
        HttpStatus.UNAUTHORIZED
      );
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw new HttpException(
        'Refresh token malformed',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return { user, token };
  }

  public async createAccessTokenFromRefreshToken(
    refresh: string
  ): Promise<{ token: string }> {
    const { user } = await this.resolveRefreshToken(refresh);
    const token = await this.generateAccessToken(user);

    return { token };
  }

  private async decodeAndCheckRefreshToken(
    token: string
  ): Promise<RefreshTokenPayload> {
    try {
      const res = await this.jwt.verifyAsync(token);
      return res;
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new HttpException(
          'Refresh token expired',
          HttpStatus.UNAUTHORIZED
        );
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }

  private async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<UserEntity> {
    const subId = payload.subject;

    if (!subId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return await this.users.findById(subId);
  }

  private async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<RefreshToken | null> {
    const tokenId = payload.jti;
    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.tokens.findTokenById(tokenId);
  }
}
