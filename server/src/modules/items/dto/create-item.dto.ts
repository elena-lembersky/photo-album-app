import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  imageId: string;

  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Title is too short. Minimum length is 3 characters.',
  })
  @MaxLength(50, {
    message: 'Title is too long. Maximum length is 50 characters.',
  })
  title?: string;
}
