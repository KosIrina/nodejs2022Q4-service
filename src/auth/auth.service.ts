import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtPayload, JwtPayloadWithRefresh, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(createUserDto);
  }

  async login({ login, password }: CreateUserDto): Promise<Tokens> {
    const user = await this.userService.findOneByLogin(login);
    if (!user) {
      throw new ForbiddenException('Incorrect login/password');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Incorrect login/password');
    }

    return await this.getTokens(user.id, login);
  }

  async refresh(
    { userId, login, refreshToken: payloadRefreshToken }: JwtPayloadWithRefresh,
    refreshToken: string,
  ): Promise<Tokens | any> {
    await this.verifyRefreshToken(payloadRefreshToken);

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not specified in body');
    }

    await this.verifyRefreshToken(refreshToken);

    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new ForbiddenException(`Such user doesn't exist`);
    }

    return await this.getTokens(userId, login);
  }

  private async getTokens(userId: string, userLogin: string): Promise<Tokens> {
    const payload: JwtPayload = { userId, login: userLogin };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  private async verifyRefreshToken(refreshToken: string) {
    try {
      const verify = await this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      return verify;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new ForbiddenException('Refresh token expired');
      }
      if (err.name === 'JsonWebTokenError') {
        throw new ForbiddenException('Invalid refresh token');
      }
    }
  }
}
