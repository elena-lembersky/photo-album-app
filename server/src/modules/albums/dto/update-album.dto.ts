import {
  IsString,
  IsOptional,
  IsUrl,
  ValidateIf,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  @MinLength(3, {
    message: 'Title is too short. Minimum length is 3 characters.',
  })
  @MaxLength(50, {
    message: 'Title is too long. Maximum length is 50 characters.',
  })
  title?: string;

  @ValidateIf((o) => o.coverImage !== undefined)
  @IsUrl()
  @IsOptional()
  coverImage?: string | null;
}
