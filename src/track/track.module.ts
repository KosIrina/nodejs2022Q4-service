import { Module, forwardRef } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DBModule } from 'src/db/db.module';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [DBModule, forwardRef(() => FavsModule)],
  exports: [TrackService],
})
export class TrackModule {}
