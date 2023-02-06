import { Injectable } from '@nestjs/common';
import { ITrack } from 'src/track/models/track.model';
import { IUser } from 'src/user/models/user.model';
import { IArtist } from 'src/artist/models/artist.model';
import { IAlbum } from 'src/album/models/album.model';
import { IFavorites } from 'src/favs/models/favs.model';

@Injectable()
export class DBService {
  users: IUser[] = [];
  tracks: ITrack[] = [];
  artists: IArtist[] = [];
  albums: IAlbum[] = [];
  favorites: IFavorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
