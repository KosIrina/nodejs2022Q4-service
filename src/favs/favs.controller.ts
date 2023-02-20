import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Header,
  HttpCode,
  ParseUUIDPipe,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { StatusCodes, Routes } from 'src/types';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @Header('Accept', 'application/json')
  async findAll() {
    return await this.favsService.findAll();
  }

  @Post(':route/:id')
  @Header('Accept', 'application/json')
  async add(
    @Param('route') route: Routes,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const { error, message } = await this.favsService.add(route, id);
    if (error === StatusCodes.UnprocessableEntity) {
      throw new UnprocessableEntityException(message);
    }
  }

  @Delete(':route/:id')
  @Header('Accept', 'application/json')
  @HttpCode(StatusCodes.NoContent)
  async remove(
    @Param('route') route: Routes,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const { error, message } = await this.favsService.remove(route, id);
    if (error === StatusCodes.NotFound) {
      throw new NotFoundException(message);
    }
  }
}
