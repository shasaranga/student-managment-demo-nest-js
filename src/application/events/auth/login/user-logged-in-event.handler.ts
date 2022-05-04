import { Inject, LoggerService } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserLoggedInEvent } from './user-logged-in.event';

@EventsHandler(UserLoggedInEvent)
export class UserLoggedInEventHandler
  implements IEventHandler<UserLoggedInEvent>
{
  // here we can inject "Logger" from nestjs/common as well
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  handle(event: UserLoggedInEvent): void {
    this.logger.log(`User ${event.email} has successfully logged in`);
  }
}
