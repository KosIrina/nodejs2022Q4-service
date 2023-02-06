import { Injectable } from '@nestjs/common';
import { ITrack } from 'src/track/models/track.model';
import { IUser } from 'src/user/models/user.model';

@Injectable()
export class DBService {
  users: IUser[] = [];
  tracks: ITrack[] = [];
}
