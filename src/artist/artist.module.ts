import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  exports: [ArtistService],
})
export class ArtistModule {}
