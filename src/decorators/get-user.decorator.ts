import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(ctx);
    const request = gqlCtx.getContext().req;
    console.log(request, 'asasasasas')
    return request.user;
  })
/*
export const CurrentUser = createParamDecorator(
  (data, req) => req.user,
);*/
