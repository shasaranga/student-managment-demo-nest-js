import { AggregateRoot } from '@nestjs/cqrs';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class DomainEntity extends AggregateRoot {
  @CreateDateColumn()
  readonly created: Date;

  @UpdateDateColumn()
  readonly updated: Date;
}
