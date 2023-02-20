import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { StatusCodes } from 'src/types';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly repository: Repository<AlbumEntity>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const newAlbum = this.repository.create(createAlbumDto);
    return await this.repository.save(newAlbum);
  }

  async findAll(): Promise<AlbumEntity[]> {
    return await this.repository.find();
  }

  async findOne(
    id: string,
  ): Promise<{ data: AlbumEntity; error: StatusCodes }> {
    const currentAlbum = await this.repository.findOneBy({ id });
    if (!currentAlbum) {
      return { data: null, error: StatusCodes.NotFound };
    }
    return { data: currentAlbum, error: null };
  }

  async update(
    id: string,
    { name, year, artistId }: UpdateAlbumDto,
  ): Promise<{ data: AlbumEntity; error: StatusCodes }> {
    const currentAlbum = await this.repository.findOneBy({ id });
    if (!currentAlbum) {
      return { data: null, error: StatusCodes.NotFound };
    }
    currentAlbum.name = name;
    currentAlbum.year = year;
    currentAlbum.artistId = artistId;
    await this.repository.save(currentAlbum);

    return { data: currentAlbum, error: null };
  }

  async remove(id: string): Promise<{ error: StatusCodes }> {
    const currentAlbum = await this.repository.findOneBy({ id });
    if (!currentAlbum) {
      return { error: StatusCodes.NotFound };
    }
    await this.repository.remove(currentAlbum);
    return { error: null };
  }
}
