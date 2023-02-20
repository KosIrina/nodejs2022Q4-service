import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TrackEntity } from 'src/track/entities/track.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => TrackEntity, (track) => track.artistId)
  tracks: TrackEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.artistId)
  albums: AlbumEntity[];
}
