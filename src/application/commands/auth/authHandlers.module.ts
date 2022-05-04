import { UserLoggedInEventHandler } from 'src/application/events/auth/login/user-logged-in-event.handler';
import { LoginCommandHandler } from './login/login-command.handler';
import { SignUpCommandHandler } from './signup/signup-command.handler';

export const AuthHandlerModule = [
  LoginCommandHandler,
  SignUpCommandHandler,
  UserLoggedInEventHandler,
];
