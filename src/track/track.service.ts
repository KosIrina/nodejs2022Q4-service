import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from 'src/db/db.service';
import { FavsService } from 'src/favs/favs.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { StatusCodes } from 'src/types';
import { ITrack } from './models/track.model';

@Injectable()
export class TrackService {
  constructor(
    private db: DBService,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.db.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string): { data: ITrack; error: StatusCodes } {
    const currentTrack = this.db.tracks.find((track) => track.id === id);
    if (!currentTrack) {
      return { data: null, error: StatusCodes.NotFound };
    }
    return { data: currentTrack, error: null };
  }

  update(
    id: string,
    { name, artistId, albumId, duration }: UpdateTrackDto,
  ): { data: ITrack; error: StatusCodes } {
    const currentTrack = this.db.tracks.find((track) => track.id === id);
    if (!currentTrack) {
      return { data: null, error: StatusCodes.NotFound };
    }
    currentTrack.name = name;
    currentTrack.artistId = artistId;
    currentTrack.albumId = albumId;
    currentTrack.duration = duration;
    return { data: currentTrack, error: null };
  }

  remove(id: string): { error: StatusCodes } {
    const currentTrackIndex = this.db.tracks.findIndex(
      (track) => track.id === id,
    );
    if (currentTrackIndex === -1) {
      return { error: StatusCodes.NotFound };
    }
    this.favsService.updateAfterEntityDelition('track', id);
    this.db.tracks.splice(currentTrackIndex, 1);
    return { error: null };
  }

  removeArtistId(artistId: string) {
    const tracks = this.findAll();
    tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  removeAlbumId(albumId: string) {
    const tracks = this.findAll();
    tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
