import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

import { CurrentUser } from '../../users/entities/current-user.entity';

/*
 * This decorator can be used to extra a subset of (with a single property) or
 * the whole `CurrentUser` object, which has been attached to the `Request`
 * object.
 */
export const CurrentUserData = createParamDecorator<
  string,
  ExecutionContext,
  Partial<CurrentUser>
>((key, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  const currentUser = request.currentUser;

  if (!currentUser) {
    throw new NotFoundException('No current user found.');
  }
  if (key && !Object.hasOwn(currentUser, key)) {
    throw new NotFoundException(`No ${key} found for the current user.`);
  }

  return key ? { [key]: currentUser[key] } : currentUser;
});
