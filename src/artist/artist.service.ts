import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from 'src/db/db.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtist } from './models/artist.model';
import { StatusCodes } from 'src/types';

@Injectable()
export class ArtistService {
  constructor(
    private db: DBService,
    private trackService: TrackService,
    private albumService: AlbumService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.db.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string): { data: IArtist; error: StatusCodes } {
    const currentArtist = this.db.artists.find((artist) => artist.id === id);
    if (!currentArtist) {
      return { data: null, error: StatusCodes.NotFound };
    }
    return { data: currentArtist, error: null };
  }

  update(
    id: string,
    { name, grammy }: UpdateArtistDto,
  ): { data: IArtist; error: StatusCodes } {
    const currentArtist = this.db.artists.find((artist) => artist.id === id);
    if (!currentArtist) {
      return { data: null, error: StatusCodes.NotFound };
    }
    currentArtist.name = name;
    currentArtist.grammy = grammy;
    return { data: currentArtist, error: null };
  }

  remove(id: string): { error: StatusCodes } {
    const currentArtistIndex = this.db.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (currentArtistIndex === -1) {
      return { error: StatusCodes.NotFound };
    }
    this.trackService.removeArtistId(id);
    this.albumService.removeArtistId(id);
    this.db.artists.splice(currentArtistIndex, 1);
    return { error: null };
  }
}
