import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TokenService } from '@root/modules/common/auth/services/token.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = this.getRequest(context);
    const authHeader = req.headers.authorization as string;

    if (!authHeader) {
      throw new BadRequestException('Authorization header not found.');
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
      throw new BadRequestException(`Authentication type \'Bearer\' required. Found \'${type}\'`);
    }
    const { valid, user } = await this.tokenService.validateToken(
      token
    );
    console.log(valid, user, '-----------------------')
    if (valid) {
      req.user = user;
      return true;
    }
    throw new UnauthorizedException('Token not valid');
  }
}
