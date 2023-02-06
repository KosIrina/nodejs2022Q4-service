import { Module, forwardRef } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DBModule } from 'src/db/db.module';
import { TrackModule } from 'src/track/track.module';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [
    DBModule,
    forwardRef(() => TrackModule),
    forwardRef(() => FavsModule),
  ],
  exports: [AlbumService],
})
export class AlbumModule {}
