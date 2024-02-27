import { ExecutionContext, createParamDecorator } from '@nestjs/common';
export const LoggedInUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.loggedInUser;
    },
);
