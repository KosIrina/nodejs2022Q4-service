import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from 'src/db/db.service';
import { TrackService } from 'src/track/track.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbum } from './models/album.model';
import { StatusCodes } from 'src/types';

@Injectable()
export class AlbumService {
  constructor(private db: DBService, private trackService: TrackService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string): { data: IAlbum; error: StatusCodes } {
    const currentAlbum = this.db.albums.find((album) => album.id === id);
    if (!currentAlbum) {
      return { data: null, error: StatusCodes.NotFound };
    }
    return { data: currentAlbum, error: null };
  }

  update(
    id: string,
    { name, year, artistId }: UpdateAlbumDto,
  ): { data: IAlbum; error: StatusCodes } {
    const currentAlbum = this.db.albums.find((album) => album.id === id);
    if (!currentAlbum) {
      return { data: null, error: StatusCodes.NotFound };
    }
    currentAlbum.name = name;
    currentAlbum.year = year;
    currentAlbum.artistId = artistId;
    return { data: currentAlbum, error: null };
  }

  remove(id: string): { error: StatusCodes } {
    const currentAlbumIndex = this.db.albums.findIndex(
      (album) => album.id === id,
    );
    if (currentAlbumIndex === -1) {
      return { error: StatusCodes.NotFound };
    }
    this.trackService.removeAlbumId(id);
    this.db.albums.splice(currentAlbumIndex, 1);
    return { error: null };
  }
}
