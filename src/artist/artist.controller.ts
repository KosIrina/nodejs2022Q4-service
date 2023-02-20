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
import { ArtistEntity } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async create(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ArtistEntity> {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  @Header('Accept', 'application/json')
  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @Header('Accept', 'application/json')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ArtistEntity> {
    const { data, error } = await this.artistService.findOne(id);
    if (error === StatusCodes.NotFound) {
      throw new NotFoundException('Artist not found');
    }
    return data;
  }

  @Put(':id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const { data, error } = await this.artistService.update(
      id,
      updateArtistDto,
    );
    if (error === StatusCodes.NotFound) {
      throw new NotFoundException('Artist not found');
    }
    return data;
  }

  @Delete(':id')
  @Header('Accept', 'application/json')
  @HttpCode(StatusCodes.NoContent)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const { error } = await this.artistService.remove(id);
    if (error === StatusCodes.NotFound) {
      throw new NotFoundException('Artist not found');
    }
  }
}
