import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { Routes } from 'src/types';

@Entity()
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  entityType: Routes;

  @OneToOne(() => TrackEntity, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  track: TrackEntity;

  @Column({ type: 'uuid', nullable: true })
  trackId: number;

  @OneToOne(() => ArtistEntity, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  artist: ArtistEntity;

  @Column({ type: 'uuid', nullable: true })
  artistId: number;

  @OneToOne(() => AlbumEntity, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  album: AlbumEntity;

  @Column({ type: 'uuid', nullable: true })
  albumId: number;
}
