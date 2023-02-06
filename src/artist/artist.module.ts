import { Module, forwardRef } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DBModule } from 'src/db/db.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [
    DBModule,
    forwardRef(() => TrackModule),
    AlbumModule,
    forwardRef(() => FavsModule),
  ],
  exports: [ArtistService],
})
export class ArtistModule {}
