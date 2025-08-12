import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPublic } from '@/users/entities/user.entity';
import { Request } from 'express';

export const AuthUser = createParamDecorator(
  <K extends keyof UserPublic>(
    data: K | undefined,
    ctx: ExecutionContext,
  ): UserPublic | UserPublic[K] | undefined => {
    const user = ctx.switchToHttp().getRequest<Request>().user as
      | UserPublic
      | undefined;

    console.log('got user', user);
    if (!user) {
      return undefined;
    }

    // 4. If a 'data' key (a specific property name) was provided, return that property from the user object.
    //    The generic type <K> ensures the return type is correctly inferred as the type of that property (e.g., User['email'] is string).
    if (data) {
      return user[data];
    }

    // 5. If no 'data' key was provided, return the entire user object.
    return user;
  },
);
