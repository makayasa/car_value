import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterUpdate,
  AfterRemove,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';

import { uuid } from 'uuidv4';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  // @PrimaryGeneratedColumn('uuid')

  @BeforeInsert()
  generateuuid() {
    this.uuid = uuid();
  }

  @PrimaryColumn('uuid')
  uuid: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterUpdate()
  logUpdate() {
    console.log('Update user with id', this.uuid);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with id', this.uuid);
  }
}
