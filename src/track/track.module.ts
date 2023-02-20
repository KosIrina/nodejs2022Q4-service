import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackEntity } from './entities/track.entity';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  exports: [TrackService],
})
export class TrackModule {}
