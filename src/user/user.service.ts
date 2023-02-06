import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from 'src/db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { StatusCodes } from 'src/types';

@Injectable()
export class UserService {
  constructor(private db: DBService) {}

  create({ login, password }: CreateUserDto): UserEntity {
    const timestamp = Date.now();
    const newUser = new UserEntity({
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    this.db.users.push(newUser);
    return newUser;
  }

  findAll(): UserEntity[] {
    return this.db.users;
  }

  findOne(id: string): { data: UserEntity; error: StatusCodes } {
    const currentUser = this.db.users.find((user) => user.id === id);
    if (!currentUser) {
      return { data: null, error: StatusCodes.NotFound };
    }
    return { data: currentUser, error: null };
  }

  update(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): { data: UserEntity; error: StatusCodes } {
    const currentUser = this.db.users.find((user) => user.id === id);
    if (!currentUser) {
      return { data: null, error: StatusCodes.NotFound };
    }
    if (currentUser.password !== oldPassword) {
      return { data: null, error: StatusCodes.Forbidden };
    }
    currentUser.password = newPassword;
    currentUser.version += 1;
    currentUser.updatedAt = Date.now();
    return { data: currentUser, error: null };
  }

  remove(id: string): { error: StatusCodes } {
    const currentUserIndex = this.db.users.findIndex((user) => user.id === id);
    if (currentUserIndex === -1) {
      return { error: StatusCodes.NotFound };
    }
    this.db.users.splice(currentUserIndex, 1);
    return { error: null };
  }
}
