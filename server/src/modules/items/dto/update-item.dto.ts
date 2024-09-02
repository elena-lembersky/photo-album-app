import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateItemDto {
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
