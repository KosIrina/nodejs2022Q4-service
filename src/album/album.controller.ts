import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Header,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { StatusCodes } from 'src/types';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @Header('Accept', 'application/json')
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @Header('Accept', 'application/json')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const { data, error } = this.albumService.findOne(id);
    if (error === StatusCodes.NotFound) {
      throw new NotFoundException('Album not found');
    }
    return data;
  }

  @Put(':id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const { data, error } = this.albumService.update(id, updateAlbumDto);
    if (error === StatusCodes.NotFound) {
      throw new NotFoundException('Album not found');
    }
    return data;
  }

  @Delete(':id')
  @Header('Accept', 'application/json')
  @HttpCode(StatusCodes.NoContent)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const { error } = this.albumService.remove(id);
    if (error === StatusCodes.NotFound) {
      throw new NotFoundException('Album not found');
    }
  }
}
