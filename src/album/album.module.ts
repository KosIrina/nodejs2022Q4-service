import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DBModule } from 'src/db/db.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [DBModule, TrackModule],
  exports: [AlbumService],
})
export class AlbumModule {}
