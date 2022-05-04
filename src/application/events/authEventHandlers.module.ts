import { UserLoggedInEventHandler } from './auth/login/user-logged-in-event.handler';
import { UserCreatedEventHandler } from './auth/signup/user-created-event.handler';
import { UserRoleSavedEventHandler } from './auth/signup/user-roles-saved-event.handler';

export const AuthEventHandlers = [
  UserLoggedInEventHandler,
  UserCreatedEventHandler,
  UserRoleSavedEventHandler,
];
