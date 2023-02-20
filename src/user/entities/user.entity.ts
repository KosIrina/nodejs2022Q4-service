import { Exclude, Transform } from 'class-transformer';
import {
  Entity,
  Column,
  VersionColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  @Transform(({ value }) => value.getTime())
  createdAt: Date;

  @UpdateDateColumn()
  @Transform(({ value }) => value.getTime())
  updatedAt: Date;

  @Column()
  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
