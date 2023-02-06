import { Module, forwardRef } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { DBModule } from 'src/db/db.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [
    DBModule,
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    ArtistModule,
  ],
  exports: [FavsService],
})
export class FavsModule {}
