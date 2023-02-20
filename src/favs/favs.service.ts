import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { StatusCodes, Routes } from 'src/types';
import { FavoritesEntity } from './entities/favs.entity';
import { IFavoritesRepsonse } from './models/favs.model';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly repository: Repository<FavoritesEntity>,
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  async findAll(): Promise<IFavoritesRepsonse> {
    const tracks = await this.repository.find({
      where: { entityType: 'track' },
    });
    const albums = await this.repository.find({
      where: { entityType: 'album' },
    });
    const artists = await this.repository.find({
      where: { entityType: 'artist' },
    });

    return {
      tracks: tracks.map((track) => track.track),
      albums: albums.map((album) => album.album),
      artists: artists.map((artist) => artist.artist),
    };
  }

  async add(
    route: Routes,
    id: string,
  ): Promise<{ error: StatusCodes; message: string }> {
    const currentEntity = await this[`${route}Service`].findOne(id);
    if (currentEntity.error === StatusCodes.NotFound) {
      return {
        error: StatusCodes.UnprocessableEntity,
        message: `${route[0].toUpperCase() + route.slice(1)} doesn't exist`,
      };
    }
    const newFav = this.repository.create({
      entityType: route,
      [`${route}Id`]: id,
    });
    await this.repository.save(newFav);
    return { error: null, message: null };
  }

  async remove(
    route: Routes,
    id: string,
  ): Promise<{ error: StatusCodes; message: string }> {
    const entity = await this.repository.find({
      where: { entityType: route, [`${route}Id`]: id },
    });
    if (!entity) {
      return {
        error: StatusCodes.NotFound,
        message: `${
          route[0].toUpperCase() + route.slice(1)
        } hasn't been added to favorites yet`,
      };
    }
    await this.repository.remove(entity);
    return { error: null, message: null };
  }
}
