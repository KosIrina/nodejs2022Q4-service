import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { StatusCodes } from 'src/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create({ login, password }: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity({ login, password });
    return await this.repository.save(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<{ data: UserEntity; error: StatusCodes }> {
    const currentUser = await this.repository.findOneBy({ id });
    if (!currentUser) {
      return { data: null, error: StatusCodes.NotFound };
    }
    return { data: currentUser, error: null };
  }

  async update(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<{ data: UserEntity; error: StatusCodes }> {
    const currentUser = await this.repository.findOneBy({ id });
    if (!currentUser) {
      return { data: null, error: StatusCodes.NotFound };
    }
    if (currentUser.password !== oldPassword) {
      return { data: null, error: StatusCodes.Forbidden };
    }
    currentUser.password = newPassword;
    await this.repository.save(currentUser);

    return { data: currentUser, error: null };
  }

  async remove(id: string): Promise<{ error: StatusCodes }> {
    const currentUser = await this.repository.findOneBy({ id });
    if (!currentUser) {
      return { error: StatusCodes.NotFound };
    }
    await this.repository.remove(currentUser);
    return { error: null };
  }
}
