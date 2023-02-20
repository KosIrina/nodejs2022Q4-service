import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { FavoritesEntity } from './entities/favs.entity';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity]),
    TrackModule,
    AlbumModule,
    ArtistModule,
  ],
})
export class FavsModule {}
