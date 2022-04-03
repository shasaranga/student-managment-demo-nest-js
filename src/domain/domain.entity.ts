import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class Domain {
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
