import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRefresh } from '../types';

export const GetPayload = createParamDecorator(
  (_: undefined, context: ExecutionContext): JwtPayloadWithRefresh => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
