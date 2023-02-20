import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { StatusCodes } from 'src/types';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly repository: Repository<ArtistEntity>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist = this.repository.create(createArtistDto);
    return await this.repository.save(newArtist);
  }

  async findAll(): Promise<ArtistEntity[]> {
    return await this.repository.find();
  }

  async findOne(
    id: string,
  ): Promise<{ data: ArtistEntity; error: StatusCodes }> {
    const currentArtist = await this.repository.findOneBy({ id });
    if (!currentArtist) {
      return { data: null, error: StatusCodes.NotFound };
    }
    return { data: currentArtist, error: null };
  }

  async update(
    id: string,
    { name, grammy }: UpdateArtistDto,
  ): Promise<{ data: ArtistEntity; error: StatusCodes }> {
    const currentArtist = await this.repository.findOneBy({ id });
    if (!currentArtist) {
      return { data: null, error: StatusCodes.NotFound };
    }
    currentArtist.name = name;
    currentArtist.grammy = grammy;
    await this.repository.save(currentArtist);

    return { data: currentArtist, error: null };
  }

  async remove(id: string): Promise<{ error: StatusCodes }> {
    const currentArtist = await this.repository.findOneBy({ id });
    if (!currentArtist) {
      return { error: StatusCodes.NotFound };
    }
    await this.repository.remove(currentArtist);
    return { error: null };
  }
}
