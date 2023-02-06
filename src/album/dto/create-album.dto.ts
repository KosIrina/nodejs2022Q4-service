import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty()
  @IsUUID('4')
  artistId: string | null;
}
