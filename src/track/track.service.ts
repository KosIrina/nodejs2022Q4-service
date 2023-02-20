import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { StatusCodes } from 'src/types';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly repository: Repository<TrackEntity>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const newTrack = this.repository.create(createTrackDto);
    return await this.repository.save(newTrack);
  }

  async findAll(): Promise<TrackEntity[]> {
    return await this.repository.find();
  }

  async findOne(
    id: string,
  ): Promise<{ data: TrackEntity; error: StatusCodes }> {
    const currentTrack = await this.repository.findOneBy({ id });
    if (!currentTrack) {
      return { data: null, error: StatusCodes.NotFound };
    }
    return { data: currentTrack, error: null };
  }

  async update(
    id: string,
    { name, artistId, albumId, duration }: UpdateTrackDto,
  ): Promise<{ data: TrackEntity; error: StatusCodes }> {
    const currentTrack = await this.repository.findOneBy({ id });
    if (!currentTrack) {
      return { data: null, error: StatusCodes.NotFound };
    }
    currentTrack.name = name;
    currentTrack.artistId = artistId;
    currentTrack.albumId = albumId;
    currentTrack.duration = duration;
    await this.repository.save(currentTrack);

    return { data: currentTrack, error: null };
  }

  async remove(id: string): Promise<{ error: StatusCodes }> {
    const currentTrack = await this.repository.findOneBy({ id });
    if (!currentTrack) {
      return { error: StatusCodes.NotFound };
    }
    await this.repository.remove(currentTrack);
    return { error: null };
  }
}
