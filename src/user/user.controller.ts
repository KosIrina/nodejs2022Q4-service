import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Header,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseUUIDPipe,
  NotFoundException,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { StatusCodes } from 'src/types';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  create(@Body() createUserDto: CreateUserDto): UserEntity {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Header('Accept', 'application/json')
  findAll(): UserEntity[] {
    return this.userService.findAll();
  }

  @Get(':id')
  @Header('Accept', 'application/json')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): UserEntity {
    const { data, error } = this.userService.findOne(id);
    if (error === StatusCodes.NotFound) {
      throw new NotFoundException('User not found');
    }
    return data;
  }

  @Put(':id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { data, error } = this.userService.update(id, updatePasswordDto);
    if (error === StatusCodes.Forbidden) {
      throw new ForbiddenException('Incorrect password');
    }
    if (error === StatusCodes.NotFound) {
      throw new NotFoundException('User not found');
    }
    return data;
  }

  @Delete(':id')
  @Header('Accept', 'application/json')
  @HttpCode(StatusCodes.NoContent)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): void {
    const { error } = this.userService.remove(id);
    if (error === StatusCodes.NotFound) {
      throw new NotFoundException('User not found');
    }
  }
}
