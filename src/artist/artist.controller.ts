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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { StatusCodes } from 'src/types';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @Header('Accept', 'application/json')
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @Header('Accept', 'application/json')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const { data, error } = this.artistService.findOne(id);
    if (error === StatusCodes.NotFound) {
      throw new NotFoundException('Artist not found');
    }
    return data;
  }

  @Put(':id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const { data, error } = this.artistService.update(id, updateArtistDto);
    if (error === StatusCodes.NotFound) {
      throw new NotFoundException('Artist not found');
    }
    return data;
  }

  @Delete(':id')
  @Header('Accept', 'application/json')
  @HttpCode(StatusCodes.NoContent)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const { error } = this.artistService.remove(id);
    if (error === StatusCodes.NotFound) {
      throw new NotFoundException('Artist not found');
    }
  }
}
