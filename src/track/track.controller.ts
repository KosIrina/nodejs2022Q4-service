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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { StatusCodes } from 'src/types';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @Header('Accept', 'application/json')
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @Header('Accept', 'application/json')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const { data, error } = this.trackService.findOne(id);
    if (error === StatusCodes.NotFound) {
      throw new NotFoundException('Track not found');
    }
    return data;
  }

  @Put(':id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const { data, error } = this.trackService.update(id, updateTrackDto);
    if (error === StatusCodes.NotFound) {
      throw new NotFoundException('Track not found');
    }
    return data;
  }

  @Delete(':id')
  @Header('Accept', 'application/json')
  @HttpCode(StatusCodes.NoContent)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const { error } = this.trackService.remove(id);
    if (error === StatusCodes.NotFound) {
      throw new NotFoundException('Track not found');
    }
  }
}
