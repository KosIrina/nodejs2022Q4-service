import { IArtist } from 'src/artist/models/artist.model';
import { IAlbum } from 'src/album/models/album.model';
import { ITrack } from 'src/track/models/track.model';

export interface IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface IFavoritesRepsonse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
