import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { StatusCodes, Routes } from 'src/types';

@Injectable()
export class FavsService {
  constructor(
    private db: DBService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  findAll() {
    const {
      tracks: tracksIds,
      albums: albumsIds,
      artists: artistsIds,
    } = this.db.favorites;

    const tracks = tracksIds.map(
      (trackId) => this.trackService.findOne(trackId).data,
    );
    const artists = artistsIds.map(
      (artistId) => this.artistService.findOne(artistId).data,
    );
    const albums = albumsIds.map(
      (albumId) => this.albumService.findOne(albumId).data,
    );

    return {
      tracks: tracks.filter((track) => !!track),
      artists: artists.filter((artist) => !!artist),
      albums: albums.filter((album) => !!album),
    };
  }

  add(route: Routes, id: string): { error: StatusCodes; message: string } {
    const currentEntity = this[`${route}Service`].findOne(id);
    if (currentEntity.error === StatusCodes.NotFound) {
      return {
        error: StatusCodes.UnprocessableEntity,
        message: `${route[0].toUpperCase() + route.slice(1)} doesn't exist`,
      };
    }
    this.db.favorites[`${route}s`].push(id);
    return { error: null, message: null };
  }

  remove(route: Routes, id: string): { error: StatusCodes; message: string } {
    const entityIndex = this.db.favorites[`${route}s`].findIndex(
      (entityId) => entityId === id,
    );
    if (entityIndex === -1) {
      return {
        error: StatusCodes.NotFound,
        message: `${
          route[0].toUpperCase() + route.slice(1)
        } hasn't been added to favorites yet`,
      };
    }
    this.db.favorites[`${route}s`].splice(entityIndex, 1);
    return { error: null, message: null };
  }

  updateAfterEntityDelition(route: Routes, id: string) {
    const entityIndex = this.db.favorites[`${route}s`].findIndex(
      (entityId) => entityId === id,
    );
    if (entityIndex !== -1) {
      this.db.favorites[`${route}s`].splice(entityIndex, 1);
    }
  }
}
