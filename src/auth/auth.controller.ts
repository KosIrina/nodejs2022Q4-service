import {
  Controller,
  Post,
  Body,
  Header,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetPayload, Public } from './decorators';
import { RefreshTokenGuard } from './guards';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtPayloadWithRefresh, Tokens } from './types';

@Public()
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async signup(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.authService.signup(createUserDto);
  }

  @Post('login')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async login(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
    return await this.authService.login(createUserDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetPayload() userPayload: JwtPayloadWithRefresh,
    @Body('refreshToken') refreshToken: string,
  ): Promise<Tokens | any> {
    return await this.authService.refresh(userPayload, refreshToken);
  }
}
