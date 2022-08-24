import {
  HttpException,
  HttpStatus,
  Injectable, InternalServerErrorException, UnauthorizedException,
  UnprocessableEntityException
} from '@nestjs/common';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { RefreshToken } from '@root/data-access/entities/refresh-token.entity';
import { JwtService } from '@nestjs/jwt';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { QueryService, InjectQueryService } from '@nestjs-query/core';

const BASE_OPTIONS: SignOptions = {
  issuer: 'todoit',
  audience: 'todoit'
};

export interface RefreshTokenPayload {
  jti: number;
  subject: number;
}

@Injectable()
export class TokenService {
  constructor(
    @InjectQueryService(UserEntity) readonly users: QueryService<UserEntity>,
    @InjectQueryService(RefreshToken)
    readonly tokens: QueryService<RefreshToken>,
    private jwt: JwtService
  ) {
  }

  public async generateAccessToken(user: UserEntity): Promise<string> {
    try {
      const opts: SignOptions = {
        ...BASE_OPTIONS,
        subject: String(user.id),
        expiresIn: '5m'
      };

      return await this.jwt.signAsync(opts, { expiresIn: '1m' });
    } catch (e) {
      console.error(e);
    }

  }

  public async generateRefreshToken(user: UserEntity): Promise<string> {
    try {
      const token = await this.createRefreshToken(user);

      const opts: SignOptions = {
        ...BASE_OPTIONS,
        subject: String(user.id),
        jwtid: String(token.id),
        expiresIn: '2d'
      };

      return this.jwt.signAsync(opts, {
        expiresIn: '2d'
      });
    } catch (e) {
      console.error(e.message);
    }

  }

  async validateToken(
    token
  ): Promise<{ user: UserEntity; valid: RefreshToken }> {
    try {
      const valid = this.jwt.verify(token, { ignoreExpiration: false });
      const res = { user: null, valid };
      res.user = await this.users.findById(valid.subject);
      return res;
    } catch (e) {
      new UnauthorizedException(e.message);
    }
  }

  public async resolveRefreshToken(
    encoded: string
  ): Promise<{ user: UserEntity; token: RefreshToken }> {
    const payload = await this.decodeAndCheckRefreshToken(encoded);
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
        HttpStatus.UNAUTHORIZED
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
    payload: RefreshTokenPayload
  ): Promise<UserEntity> {
    const subId = payload.subject;

    if (!subId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return await this.users.findById(subId);
  }

  private async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenPayload
  ): Promise<RefreshToken | null> {
    const tokenId = payload.jti;
    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.tokens.findById(tokenId);
  }

  private async createRefreshToken(user): Promise<RefreshToken> {
    try {
      const token = new RefreshToken();
      const today = new Date();
      token.userId = user.id;
      token.isRevoked = false;
      token.expires = new Date(today.setHours(today.getHours() + 24));
      const [userTokenExist] = await this.tokens.query({
        filter: { userId: { eq: user.id } }
      });
      if (userTokenExist) {
        const id = userTokenExist.id;
        await this.tokens.deleteOne(id);
      }
      return token.save();
    } catch (e) {
      console.error(e);
    }
  }
}
