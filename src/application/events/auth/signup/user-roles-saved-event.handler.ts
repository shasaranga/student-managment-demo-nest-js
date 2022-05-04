import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserRoleSavedEvent } from './user-roles-saved.event';

@EventsHandler(UserRoleSavedEvent)
export class UserRoleSavedEventHandler
  implements IEventHandler<UserRoleSavedEvent>
{
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger) {}

  handle(event: UserRoleSavedEvent): void {
    // we can maintain event logs by saving to a db or to a file in a specific.
    this.logger.log(`User_Role : ${event.userRole.id} successfully saved`);
  }
}
