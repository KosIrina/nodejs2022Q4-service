import { Injectable } from '@nestjs/common';
import { IUser } from 'src/user/models/user.model';

@Injectable()
export class DBService {
  users: IUser[] = [];
}
