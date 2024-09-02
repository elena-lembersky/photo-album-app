import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Title is too short. Minimum length is 3 characters.',
  })
  @MaxLength(50, {
    message: 'Title is too long. Maximum length is 50 characters.',
  })
  title: string;

  @IsOptional()
  @IsUrl()
  coverImage?: string | null;
}
