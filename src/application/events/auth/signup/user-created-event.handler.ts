import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserCreatedEvent } from './user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger) {}
  handle(event: UserCreatedEvent): void {
    this.logger.log(`User ${event.userId} created successfully`);
  }
}
